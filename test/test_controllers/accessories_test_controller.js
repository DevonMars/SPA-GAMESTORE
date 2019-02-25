let Accessory = require('../../Backend/models/accessory.model')
let User = require('../../Backend/models/user.model')
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../Backend/app');
let expect = require('chai').expect;

chai.use(chaiHttp);

describe('accessory controller', () => {
  var token = null;

  // before( async () => {
  //   const signup = await chai.request(app)
  //   .post('/api/user/signup')
  //   .send({email: 'devchai@test.com', password: 'welkom'})
  //   expect(signup).to.be.a('object');
  //   expect(signup.status).to.equal(201);

  //   const login = await chai.request(app)
  //   .post('/api/user/login')
  //   .send({email: 'devchai@test.com', password: 'welkom'})
  //   expect(login).to.be.a('object');
  //   expect(login.status).to.equal(200);
  //   expect(login.body).to.have.property('token');
  //   token = login.body.token;
  // });

  beforeEach(async () => {
    const login = await chai.request(app)
    .post('/api/user/login')
    .send({email: 'devchai@test.com', password: 'welkom'})
    expect(login).to.be.a('object');
    expect(login.body).to.have.property('token');
    token = login.body.token;
  });

  afterEach(async () => {
    await Accessory.deleteMany();
  });

  describe('#/get Accessory()', () => {

    it('should Get All the accessories', async () => {
      const getAll = await chai.request(app)
      .get('/api/accessories')
      expect(getAll.status).to.equal(200);
    });
  });

  describe('/Get/:id accessory', () => {

    it('it should Get a accessory by the given id', async () => {
      const access = new Accessory({ title: "TestAccess", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'});
      await access.save();
      const getOne = await chai.request(app)
      .get('/api/accessories/' + access.id)
      expect(getOne).to.be.a('object');
      expect(getOne.status).to.equal(200);
      expect(getOne.body).to.have.property('_id').eql(access.id)
    });

    it('it should return a status code 404, if id invalid', async () => {
      const access = new Accessory({ title: "TestAccess", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'});
      const getOne = await chai.request(app)
      .get('/api/accessories/' + access.id)
      expect(getOne).to.be.a('object');
      expect(getOne.status).to.equal(404);
    });
  });

  describe('/Post Accessory', () => {

    it('it should NOT post a accessory without a title', async() =>  {
      const postFailedOne = await chai.request(app)
      .post('/api/accessories')
      .set('Authorization', 'Bearer ' + token)
      .field('Content-Type', 'multipart/form-data')
      .field({discription:'test'})
      .attach('image', 'images/hyperx.jpg')
      expect(postFailedOne.status).to.equal(400);
    });

    it('it should NOT post a accessory without a description', async() => {
      const postFailedOne = await chai.request(app)
      .post('/api/accessories')
      .set('Authorization', 'Bearer ' + token)
      .field('Content-Type', 'multipart/form-data')
      .field({title:'test'})
      .attach('image', 'images/hyperx.jpg')
      expect(postFailedOne.status).to.equal(400);
    });

    it('it should NOT post a accessory without a image', async() => {
      const postFailedOne = await chai.request(app)
      .post('/api/accessories')
      .set('Authorization', 'Bearer ' + token)
      .field('Content-Type', 'multipart/form-data')
      .field({title:'test'})
      .field({discription:'test'})
      expect(postFailedOne.status).to.equal(400);
    });

    it('it should post a accessory', async() => {
      const postOne = await chai.request(app)
      .post('/api/accessories')
      .set('Authorization', 'Bearer ' + token)
      .field('Content-Type', 'multipart/form-data')
      .field({title:'test'})
      .field({discription:'test'})
      .attach('image', 'images/hyperx.jpg')
      expect(postOne).to.be.a('object');
      expect(postOne.status).to.equal(201);
      expect(postOne.body).to.have.property('message').eql('Accessory added successfully');
    });
  });

  describe('/PUT/:id accessories', () => {

    it('it should NOT UPDATE a accessory with invalid id', async() => {
      const failedaccess = new Accessory({ title: "TestAccess", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'});
      const putFailedId = await chai.request(app)
        .put('/api/accessories/' + failedaccess.id)
        .set('Authorization', 'Bearer ' + token)
        .field('Content-Type', 'multipart/form-data')
        .field({id: failedaccess.id})
        .field({title:'TestAccess'})
        .field({discription:'test'})
        .attach('image', 'images/hyperx.jpg')
        expect(putFailedId).to.be.a('object');
        expect(putFailedId.status).to.equal(404);
    });

    it('it should NOT update a accessory without a title', async() =>  {
      const failedaccess = new Accessory({ title: "TestAccess", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'});
      await failedaccess.save();
      const putFailedTitle = await chai.request(app)
      .put('/api/accessories/' + failedaccess.id)
      .set('Authorization', 'Bearer ' + token)
      .field('Content-Type', 'multipart/form-data')
      .field({discription:'test'})
      .attach('image', 'images/hyperx.jpg')
      expect(putFailedTitle.status).to.equal(400);
    });

    it('it should NOT update a accessory without a description', async() => {
      const failedaccess = new Accessory({ title: "TestAccess", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'});
      await failedaccess.save();
      const putFailedDis = await chai.request(app)
      .put('/api/accessories/' + failedaccess.id)
      .set('Authorization', 'Bearer ' + token)
      .field('Content-Type', 'multipart/form-data')
      .field({title:'test'})
      .attach('image', 'images/hyperx.jpg')
      expect(putFailedDis.status).to.equal(400);
    });

    it('it should NOT update a accessory without a image', async() => {
      const failedaccess = new Accessory({ title: "TestAccess", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'});
      await failedaccess.save();
      const putFailedDis = await chai.request(app)
      .put('/api/accessories/' + failedaccess.id)
      .set('Authorization', 'Bearer ' + token)
      .field('Content-Type', 'multipart/form-data')
      .field({title:'test'})
      .field({discription:'test'})
      expect(putFailedDis.status).to.equal(400);
    });

    it('it should UPDATE a accessory with the given id', async() => {
      const access = new Accessory({ title: "TestAccess", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'});
      await access.save();
      const putOne = await chai.request(app)
        .put('/api/accessories/' + access.id)
        .set('Authorization', 'Bearer ' + token)
        .field('Content-Type', 'multipart/form-data')
        .field({id: access.id, title:'TestAccess', discription:'test'})
        .attach('image', 'images/hyperx.jpg')
        expect(putOne).to.be.a('object');
        expect(putOne.status).to.equal(200);
        expect(putOne.body).to.have.property('message').eql('Update Accessory successful!');
    });
  });

  describe('/DELETE/:id accessory', () => {
    it('it should return status 400 if Accessory id invalid', async() => {
      const failedaccess = new Accessory({ title: "TestAccess", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'});
      const deleteFailedId = await chai.request(app)
      .delete('/api/accessories/' + failedaccess.id)
      .set('Authorization', 'Bearer ' + token)
      .field({id: failedaccess.id})
      expect(deleteFailedId.status).to.equal(404)
      expect(deleteFailedId.body).to.have.property('message').eql('Accessory not found!')
    });

    it('it should DELETE a accessory with the given id', async() => {
      const access = new Accessory({ title: "TestAccess", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'});
      await access.save();
      const deleteOne = await chai.request(app)
      .delete('/api/accessories/' + access.id)
      .set('Authorization', 'Bearer ' + token)
      expect(deleteOne.status).to.equal(200)
      expect(deleteOne.body).to.have.property('message').eql('Accessory deleted!')
    });
  });
});

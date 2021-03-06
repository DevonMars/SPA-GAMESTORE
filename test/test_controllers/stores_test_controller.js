let Store = require('../../Backend/models/store.model');
let Game = require('../../Backend/models/game.model');
let User = require('../../Backend/models/user.model');
let Accessory = require('../../Backend/models/accessory.model.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../Backend/app');
let expect = require('chai').expect;

chai.use(chaiHttp);

describe('store controller', () => {
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
    await Game.deleteMany();
    await Store.deleteMany();
  });

  describe('/get Stores()', () => {
    it('should Get All the stores', async () => {
      const getAll = await chai.request(app)
      .get('/api/stores')
      expect(getAll.status).to.equal(200);
    });
  });

  describe('/Get/:id store', () => {

    it('it should Get a store by the given id', async () => {
      const dummyGame = new Game({title: 'testgame', discription: 'sdsdaa', imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'});
      const dummyAccessory = new Accessory({title: 'accessdsda', discription: 'gamesdad', imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'});
      await dummyGame.save();
      await dummyAccessory.save();

      const testStore = new Store({ title: "testStore", address: 'test address', games: dummyGame.id, accessories: dummyAccessory.id});
      await testStore.save();
      const getOne = await chai.request(app)
      .get('/api/stores/' + testStore.id)
      expect(getOne).to.be.a('object');
      expect(getOne.status).to.equal(200);
      expect(getOne.body).to.have.property('_id').eql(testStore.id)
    });

    it('it should return a status code 404, if id invalid', async () => {
      const testStore = new Store({ title: "testStore", address: 'test address'});
      const getFailedOne = await chai.request(app)
      .get('/api/stores/' + testStore.id)
      expect(getFailedOne).to.be.a('object');
      expect(getFailedOne.status).to.equal(404);
    });
  });

  describe('/Post Store', () => {

    it('it should NOT post a store without a title', async() =>  {
      const postFailedOne = await chai.request(app)
      .post('/api/stores')
      .set('Authorization', 'Bearer ' + token)
      .send({address:'sdsdadsdsad'})
      expect(postFailedOne.status).to.equal(400);
    });

    it('it should NOT post a game without a adress', async() => {
      const postFailedOne = await chai.request(app)
      .post('/api/stores')
      .set('Authorization', 'Bearer ' + token)
      .send({title:'Test'})
      expect(postFailedOne.status).to.equal(400);
    });

    it('it should post a store', async() => {
      const dummyGame = new Game({title: 'testgame', discription: 'sdsdaa', imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'});
      const dummyAccessory = new Accessory({title: 'accessdsda', discription: 'gamesdad', imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'});
      await dummyGame.save();
      await dummyAccessory.save();

      const postOne = await chai.request(app)
      .post('/api/stores')
      .set('Authorization', 'Bearer ' + token)
      .send({title:'Test', address:'sdsdadsdsad', games: dummyGame.id, accessories: dummyAccessory.id})
      expect(postOne).to.be.a('object');
      expect(postOne.status).to.equal(201);
      expect(postOne.body).to.have.property('message').eql('Store added successfully');
    });
  });

  describe('/PUT/:id stores', () => {
    it('it should NOT UPDATE a store with invalid id', async() => {
      const failedTestStore = new Store({ title: "testStore", address: 'test address'});
      const putFailedId = await chai.request(app)
        .put('/api/stores/' + failedTestStore.id)
        .set('Authorization', 'Bearer ' + token)
        .send({id: failedTestStore.id, title: 'updateStoretitle', discription:'test'})
        expect(putFailedId).to.be.a('object');
        expect(putFailedId.status).to.equal(404);
        expect(putFailedId.body).to.have.property('message').eql('store not found!');
    });

    it('it should UPDATE a store with the given id', async() => {
      const failedTestStore = new Store({ title: "testStore", address: 'test address'});
      await failedTestStore.save();
      const putOne = await chai.request(app)
        .put('/api/stores/' + failedTestStore.id)
        .set('Authorization', 'Bearer ' + token)
        .send({id: failedTestStore.id, title: 'updateStoretitle', discription:'test'})
        expect(putOne).to.be.a('object');
        expect(putOne.status).to.equal(200);
        expect(putOne.body).to.have.property('message').eql('Update successful!');
    });
  });

  describe('/DELETE/:id Store', () => {
    it('it should return status 404 if game id invalid', async() => {
      const failedTestStore = new Store({ title: "testStore", address: 'test address'});
      const deleteFailedId = await chai.request(app)
      .delete('/api/stores/' + failedTestStore.id)
      .set('Authorization', 'Bearer ' + token)
      expect(deleteFailedId.status).to.equal(404)
      expect(deleteFailedId.body).to.have.property('message').eql('Store not found!')
    });

    it('it should DELETE a store with the given id', async() => {
      const deletedTestStore = new Store({ title: "testStore", address: 'test address'});
      await deletedTestStore.save();
      const deleteOne = await chai.request(app)
      .delete('/api/stores/' + deletedTestStore.id)
      .set('Authorization', 'Bearer ' + token)
      expect(deleteOne.status).to.equal(200)
      expect(deleteOne.body).to.have.property('message').eql('Store deleted!')
    });
  });
});

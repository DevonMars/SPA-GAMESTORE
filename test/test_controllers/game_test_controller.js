let Game = require('../../Backend/models/game.model');
let User = require('../../Backend/models/user.model');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../Backend/app');
let expect = require('chai').expect;

chai.use(chaiHttp);

describe('game controller', () => {
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
    expect(login.status).to.equal(200);
    expect(login.body).to.have.property('token');
    token = login.body.token;

  });
  afterEach(async () => {
    await Game.deleteMany();
  });

  describe('/get Games()', () => {

    it('should Get All the games', async () => {
      const getAll = await chai.request(app)
      .get('/api/games')
      expect(getAll.status).to.equal(200);
    });
  });

  describe('/Get/:id accessory', () => {

    it('it should Get a accessory by the given id', async () => {
      const TestGame = new Game({ title: "testTitle", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'});
      await TestGame.save();
      const getOne = await chai.request(app)
      .get('/api/games/' + TestGame.id)
      expect(getOne).to.be.a('object');
      expect(getOne.status).to.equal(200);
      expect(getOne.body).to.have.property('_id').eql(TestGame.id)
    });

    it('it should return a status code 404, if id invalid', async () => {
      const TestGame = new Game({ title: "testTitle", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'});
      const getOne = await chai.request(app)
      .get('/api/games/' + TestGame.id)
      expect(getOne).to.be.a('object');
      expect(getOne.status).to.equal(404);
    });
  });

  describe('/Post Game', () => {

    it('it should NOT post a game without a title', async() =>  {
      const postFailedOne = await chai.request(app)
      .post('/api/games')
      .set('Authorization', 'Bearer ' + token)
      .field('Content-Type', 'multipart/form-data')
      .field({discription:'test'})
      .attach('image', 'images/HorizonZero.jpg')
      expect(postFailedOne.status).to.equal(400);
    });

    it('it should NOT post a game without a description', async() => {
      const postFailedOne = await chai.request(app)
      .post('/api/games')
      .set('Authorization', 'Bearer ' + token)
      .field('Content-Type', 'multipart/form-data')
      .field({title:'test'})
      .attach('image', 'images/HorizonZero.jpg')
      expect(postFailedOne.status).to.equal(400);
    });

    it('it should NOT post a game without a image', async() => {
      const postFailedOne = await chai.request(app)
      .post('/api/games')
      .set('Authorization', 'Bearer ' + token)
      .field('Content-Type', 'multipart/form-data')
      .field({title:'test'})
      .field({discription:'test'})
      expect(postFailedOne.status).to.equal(400);
    });

    it('it should post a game', async() => {
      const postOne = await chai.request(app)
      .post('/api/games')
      .set('Authorization', 'Bearer ' + token)
      .field('Content-Type', 'multipart/form-data')
      .field({title:'test'})
      .field({discription:'test'})
      .attach('image', 'images/HorizonZero.jpg')
      expect(postOne).to.be.a('object');
      expect(postOne.status).to.equal(201);
      expect(postOne.body).to.have.property('message').eql('Game added successfully');
    });
  });

  describe('/PUT/:id games', () => {

    it('it should NOT UPDATE a game with invalid id', async() => {
      const failedGame = new Game({ title: "testTitle", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'});
      const putFailedId = await chai.request(app)
        .put('/api/games/' + failedGame.id)
        .set('Authorization', 'Bearer ' + token)
        .field('Content-Type', 'multipart/form-data')
        .field({id: failedGame.id})
        .field({title:'Test'})
        .field({discription:'test'})
        .attach('image', 'images/HorizonZero.jpg')
        expect(putFailedId).to.be.a('object');
        expect(putFailedId.status).to.equal(404);
    });

    it('it should NOT update a game without a title', async() =>  {
      const failedGame = new Game({ title: "testTitle", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'});
      await failedGame.save();
      const putFailedTitle = await chai.request(app)
      .put('/api/games/' + failedGame.id)
      .set('Authorization', 'Bearer ' + token)
      .field('Content-Type', 'multipart/form-data')
      .field({discription:'test'})
      .attach('image', 'images/HorizonZero.jpg')
      expect(putFailedTitle.status).to.equal(400);
    });

    it('it should NOT update a game without a description', async() => {
      const failedGame = new Game({ title: "testTitle", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'});
      await failedGame.save();
      const putFailedDis = await chai.request(app)
      .put('/api/games/' + failedGame.id)
      .set('Authorization', 'Bearer ' + token)
      .field('Content-Type', 'multipart/form-data')
      .field({title:'test'})
      .attach('image', 'images/HorizonZero.jpg')
      expect(putFailedDis.status).to.equal(400);
    });

    it('it should NOT update a game without a image', async() => {
      const failedGame = new Game({ title: "testTitle", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'});
      await failedGame.save();
      const putFailedDis = await chai.request(app)
      .put('/api/games/' + failedGame.id)
      .set('Authorization', 'Bearer ' + token)
      .field('Content-Type', 'multipart/form-data')
      .field({title:'test'})
      .field({discription:'test'})
      expect(putFailedDis.status).to.equal(400);
    });

    it('it should UPDATE a game with the given id', async() => {
      const gameUpdate = new Game({ title: "testTitle", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'});
      await gameUpdate.save();
      const putOne = await chai.request(app)
        .put('/api/games/' + gameUpdate.id)
        .set('Authorization', 'Bearer ' + token)
        .field('Content-Type', 'multipart/form-data')
        .field({id: gameUpdate.id, title:'TestAccess', discription:'test'})
        .attach('image', 'images/HorizonZero.jpg')
        expect(putOne).to.be.a('object');
        expect(putOne.status).to.equal(200);
        expect(putOne.body).to.have.property('message').eql('Update successful!');
    });
  });

  describe('/DELETE/:id Game', () => {
    it('it should return status 404 if game id invalid', async() => {
      let gameDelete = new Game({ title: "testTitle", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'});
      const deleteFailedId = await chai.request(app)
      .delete('/api/games/' + gameDelete.id)
      .set('Authorization', 'Bearer ' + token)
      expect(deleteFailedId.status).to.equal(404)
      expect(deleteFailedId.body).to.have.property('message').eql('Game not found!')
    });

    it('it should DELETE a game with the given id', async() => {
      const gameDelete = new Game({ title: "testTitle", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'});
      await gameDelete.save();
      const deleteOne = await chai.request(app)
      .delete('/api/games/' + gameDelete.id)
      .set('Authorization', 'Bearer ' + token)
      expect(deleteOne.status).to.equal(200)
      expect(deleteOne.body).to.have.property('message').eql('Game deleted!')
    });
  });
});

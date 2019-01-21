// var request = require('supertest');
// const mongoose = require('mongoose');
// const app = require('../../Backend/app');
// var request = require('supertest');
// var chai = require('chai');
// var chaiHttp = require('chai-http');
// var expect = chai.expect;
// var should = chai.should();
// const Game = mongoose.model('Game');

// chai.use(chaiHttp);

// describe('Game Controller', () => {
//     var token = null;
//   beforeEach((done) => {
//     Game.deleteMany({}, (err) => {
//       done();
//     })
//     request(app)
//     .post('/api/user/login')
//     .send({email: 'devchai@test.com', password: 'welkom'})
//     .end(function(err, res) {
//       if (err) return done(err);
//       expect(res.body).have.property('token');
//       token = res.body.token;
//     });
//   });

//   describe('/Get Game', () => {
//     it('should Get All the games', (done) => {
//       chai.request(app)
//       .get('/api/games')
//       .end(function(err, res) {
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//     });
//   });

//   describe('/Post Game', () => {
//     it('it should post a game', (done) => {
//       request(app)
//       .post('/api/games')
//       .set('Authorization', 'Bearer ' + token)
//       .field('Content-Type', 'multipart/form-data')
//       .field({title:'TestGame', discription:'test'})
//       .attach('image', 'images/HorizonZero.jpg')
//       .expect(201)
//       .end(function(err, res) {
//         if (err) return done(err);
//         expect(res.statusCode).to.equal(201);
//         res.body.should.have.property('message').eql('Game added successfully');
//         done();
//       });
//     });
//   });

//   describe('/Get/:id game', () => {
//     it('it should Get a game by the given id', (done) => {
//       const game2 = new Game({ title: "TestGame", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'
//       });
//       game2.save((err, game2) => {
//         request(app)
//         .get('/api/games/' + game2.id)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.have.property('_id').eql(game2.id);
//           done();
//         });
//       });
//     });
//   });

//   describe('/PUT/:id games', () => {
//     it('it should UPDATE a game with the given id', (done) =>{
//       const game3 = new Game({ title: "TestGame", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'
//       });
//       game3.save((err, game3) => {
//         request(app)
//         .put('/api/games/' + game3.id)
//         .set('Authorization', 'Bearer ' + token)
//         .field('Content-Type', 'multipart/form-data')
//         .field({id: game3.id, title:'TestGame', discription:'test'})
//       //when adding image to test change the path to fit your computer
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.have.property('message').eql('Update successful!');
//           done();
//         })
//       });
//     });
//   });

//   describe('/DELETE/:id game', () => {
//     it('it should DELETE  a game with the given id', (done) => {
//       const game4 = new Game({ title: "TestGame", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'});
//       game4.save((err, game4) => {
//         request(app)
//         .delete('/api/games/' + game4.id)
//         .set('Authorization', 'Bearer ' + token)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.have.property('message').eql('Game deleted!');
//           done();
//         })
//       })
//     });
//   });
// });

let Game = require('../../Backend/models/game.model');
let User = require('../../Backend/models/user.model');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../Backend/app');
let expect = require('chai').expect;

chai.use(chaiHttp);

describe('game controller', () => {
  var token = null;

  before( async () => {
    const signup = await chai.request(app)
    .post('/api/user/signup')
    .send({email: 'devchai@test.com', password: 'welkom'})
    expect(signup).to.be.a('object');
    expect(signup.status).to.equal(201);

    const login = await chai.request(app)
    .post('/api/user/login')
    .send({email: 'devchai@test.com', password: 'welkom'})
    expect(login).to.be.a('object');
    expect(login.status).to.equal(200);
    expect(login.body).to.have.property('token');
    token = login.body.token;
  });

  // beforeEach(async () => {
  //   const login = await chai.request(app)
  //   .post('/api/user/login')
  //   .send({email: 'devchai@test.com', password: 'welkom'})
  //   expect(login).to.be.a('object');
  //   expect(login.body).to.have.property('token');
  //   token = login.body.token;
  // });
  afterEach(async () => {
    await Game.deleteMany();
    await User.deleteMany();
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

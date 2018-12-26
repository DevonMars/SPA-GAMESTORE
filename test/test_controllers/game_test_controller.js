var request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../Backend/app');
var request = require('supertest');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var should = chai.should();
const Game = mongoose.model('Game');
// const Game = require('../../Backend/models/game.model');

chai.use(chaiHttp);

// describe('Game controller', () => {
//   var token = null;
//   beforeEach((done) => {
//     request(app)
//     .post('/api/user/login')
//     .send({email: 'devchai@test.com', password: 'welkom'})
//     .end(function(err, res) {
//       if (err) return done(err);
//       expect(res.body).have.property('token');
//       token = res.body.token;
//     });

//     game1 = new Game({
//       title: 'Test1',
//       discription: 'test Description',
//       imagePath: 'http://127.0.0.1:54146/images/horizonzero.jpg-1545298875649.jpg'
// 		});

// 		game2 = new Game({
// 			title: 'Test2',
//       discription: 'test 2 Description',
//       imagePath: 'http://127.0.0.1:54146/images/horizonzero.jpg-1545298875649.jpg'
// 		});

// 		Promise.all([game1.save(), game2.save()])
// 			.then(() => done());
// 	});

//   it('GET to /api/Games reads all the games', done => {
//     request(app)
//     .get('/api/games')
//     .end(function(err, res) {
//       expect(res.statusCode).to.equal(200);
//       done();
//     });
//   });

//   it('Get /api/games to read one game', done => {
//     request(app)
//     .get('/api/games/' + game2._id)
//     .end(function(err, res) {
//       console.log(res.body)
//       expect(res.statusCode).to.equal(200);
//       done();
//     });
//   });

//   it('Post /api/games to create one game', function(done) {
//     request(app)
//     .post('/api/games')
//     .set('Authorization', 'Bearer ' + token)
//     .field('Content-Type', 'multipart/form-data')
//     .field({_id:'5c1b6313ee1ce542e0911f92',title:'newGame', discription:'content'})
//     //when adding image to test change the path to fit your computer
//     .attach('image', 'images/HorizonZero.jpg')
//     .expect(201)
//     .end(function(err, res) {
//       console.log(res.body)
//       if (err) return done(err);
//       done();
//     });
//   });

//   it('Put /api/games/:id to edit one game', done => {
//     request(app)
//     .put('/api/games/5c1b6313ee1ce542e0911f92')
//     .set('Authorization', 'Bearer ' + token)
//     .field({_id: '5c1b6313ee1ce542e0911f92', title:'newGame', discription: 'faafafdfsfsdfddaf'})
//     //when adding image to test change the path to fit your computer
//     // .attach('image', 'images/HorizonZero.jpg')
//     .expect(200)
//     .end(function(err, res) {
//       console.log(res.body)
//       if (err) return done(err);
//       done();
//     });
//   });

//   it('Delete one game', done =>{
//     request(app)
//     .delete('/api/games/5c1b6313ee1ce542e0911f92')
//     .set('Authorization', 'Bearer ' + token)
//     .expect(200)
//     .end(function(err, res) {
//       if (err) return done(err);
//       done();
//     });
//    });
// });


describe('Game Controller', () => {
    var token = null;
  beforeEach((done) => {
    Game.deleteMany({}, (err) => {
      done();
    })
    request(app)
    .post('/api/user/login')
    .send({email: 'devchai@test.com', password: 'welkom'})
    .end(function(err, res) {
      if (err) return done(err);
      expect(res.body).have.property('token');
      token = res.body.token;
    });
  });

  describe('/Get Game', () => {
    it('should Get All the games', (done) => {
      chai.request(app)
      .get('/api/games')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('/Post Game', () => {
    it('it should post a game', (done) => {
      request(app)
      .post('/api/games')
      .set('Authorization', 'Bearer ' + token)
      .field('Content-Type', 'multipart/form-data')
      .field({title:'TestGame', discription:'test'})
      //when adding image to test change the path to fit your computer
      .attach('image', 'images/HorizonZero.jpg')
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.statusCode).to.equal(201);
        console.log(res.body)
        res.body.should.have.property('message').eql('Game added successfully');
        done();
      });
    });
  });

  describe('/Get/:id game', () => {
    it('it should Get a game by the given id', (done) => {
      var game2 = new Game({
        title: "TestGame",
        discription: 'test content',
        imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'
      });
      game2.save((err, game2) => {
        request(app)
        .get('/api/games/' + game2.id)
        .send(game2)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('_id').eql(game2.id);
          done();
        });
      });
    });
  });

  describe('/PUT/:id games', () => {
    it('it should UPDATE a game with the given id', (done) =>{
      var game3 = new Game({
        title: "TestGame",
        discription: 'test content',
        imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'
      });
      game3.save((err, game3) => {
        request(app)
        .put('/api/games/' + game3.id)
        .set('Authorization', 'Bearer ' + token)
        .field('Content-Type', 'multipart/form-data')
        .field({id: game3.id, title:'TestGame', discription:'test'})
      //when adding image to test change the path to fit your computer
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Update successful!');
          done();
        })
      });
    });
  });

  describe('/DELETE/:id game', () => {
    it('it should DELETE  a game with the given id', (done) => {
      var game4 = new Game({
        title: "TestGame",
        discription: 'test content',
        imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'
      });
      game4.save((err, game4) => {
        request(app)
        .delete('/api/games/' + game4.id)
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          console.log(res.body)
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Game deleted!');
          done();
        })
      })
    });
  });
});

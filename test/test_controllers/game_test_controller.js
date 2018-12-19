var request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../Backend/app');
var request = require('supertest');
const checkAuth = require('../../Backend/middleware/check-auth');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
const Game = mongoose.model('Game');
var jwt = require('jsonwebtoken');


// const userCredentials = {
//   email: 'sponge@bob.com',
//   password: 'garyTheSnail'
// }

// const testGame = {
//   title: 'game1',
//   description: 'tes1'
// }
var fileName = 'final-fantasy-xv-1544788991521.jpg';

var game3 = {
  title: 'game3',
  discription: 'Game 3 Description',
  imagePath: fileName
};
describe('Game controller', () => {
  var token = null;
  beforeEach((done) => {
    request(app)
    .post('/api/user/login')
    .send({email: 'devchai@test.com', password: 'welkom'})
    .end(function(err, res) {
      if (err) return done(err);
      expect(res.body).have.property('token');
      token = res.body.token;
    });

    game1 = new Game({
      title: 'Movie 1',
      discription: 'Movie 1 Description',
      imagePath: 'http://spa-gamestore-api.herokuapp.com/images/final-fantasy-xv-1544788991521.jpg'
		});

		game2 = new Game({
			title: 'Movie 2',
      discription: 'Movie 2 Description',
      imagePath: 'http://spa-gamestore-api.herokuapp.com/images/final-fantasy-xv-1544788991521.jpg'
		});

		Promise.all([game1.save(), game2.save()])
			.then(() => done());
	});

  it('GET to /api/Games reads all the games', done => {

    request(app)
    .get('/api/games')
    .end(function(err, res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('Get /api/games to read one game', done => {
    request(app)
    .get('/api/games/' + game2._id)
    .end(function(err, res) {
      console.log(res.body)
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('Post /api/games to create one game', done => {
    request(app)
    .post('/api/games')
    .set('Authorization', 'Bearer ' + token)
    .field({title:'newGame', discription:'content'})
    //when adding image to test change the path to fit your computer
    .attach('image', 'C:/Users/BlackWolf/Desktop/covers/3094163-ffxv1.jpg')
    .expect(201)
    .end(function(err, res) {
      console.log(res.body)
      if (err) return done(err);
      done();
    })
  });

  it('Put /api/games/:id to edit one game', done => {
    request(app)
    .put('/api/games/' + game2._id)
    .set('Authorization', 'Bearer ' + token)
    .field({_id: game2._id, title:'RareTitle', discription: 'faafafdfsfsdfddaf'})
    //when adding image to test change the path to fit your computer
    .attach('image', 'C:/Users/BlackWolf/Desktop/covers/3094163-ffxv1.jpg')
    .expect(200)
    .end(function(err, res) {
      console.log(res.body)
      if (err) return done(err);
      done();
    });
  })

  it('Delete one game', done =>{
    
  })
});

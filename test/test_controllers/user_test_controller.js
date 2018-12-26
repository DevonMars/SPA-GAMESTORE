var User = require('../../Backend/models/user.model');
const bcrypt = require('bcrypt');
var app = require('../../Backend/app')
var request = require('supertest');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Post /signup and /login' , function() {


  it('Should register a user', function(done) {
    User.collection.drop(() => {
      var token = 'Bearer ';
      request(app)
      .post('/api/user/signup')
      .send({email: 'devchai@test.com', password: 'welkom'})
      .end(function (err, res) {
        expect(res.statusCode).to.equal(201);
        token = 'Bearer ' + res.body.token;
        done();
      })
    })
  })

  it('it responds with 401 status code if credentials are invalid', function(done) {
    request(app)
    .post('/api/user/login')
    .send({email: 'devchai@test.com', password: 'welkom1'})
    .expect(401)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    })
  })

  it('it returns JWT token if good username or password', function(done) {
    request(app)
    .post('/api/user/login')
    .send({email: 'devchai@test.com', password: 'welkom'})
    .end(function(err, res) {
      if (err) return done(err);
      expect(res.body).have.property('token');
      done();
    });
  });
})


var request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../Backend/app');
var request = require('supertest');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var should = chai.should();
const Accessory = mongoose.model('Accessory');

chai.use(chaiHttp);

describe('Accessory Controller', () => {
    var token = null;

  beforeEach((done) => {
    Accessory.deleteMany({}, (err) => {
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

  describe('/Get Accessory', () => {
    it('should Get All the accessories', (done) => {
      chai.request(app)
      .get('/api/accessories')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('/Post Accessory', () => {
    it('it should post a accessory', (done) => {
      request(app)
      .post('/api/accessories')
      .set('Authorization', 'Bearer ' + token)
      .field('Content-Type', 'multipart/form-data')
      .field({title:'test', discription:'test'})
      .attach('image', 'images/hyperx.jpg')
      .expect(201)
      .end(function(err, res) {
        res.body.should.have.property('message').eql('Accessory added successfully');
        done();
      });
    });
  });

  describe('/Get/:id accessory', () => {
    it('it should Get a accessory by the given id', (done) => {
      const access = new Accessory({ title: "TestAccess", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'});
      access.save((err, access) => {
        request(app)
        .get('/api/accessories/' + access.id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('_id').eql(access.id);
          done();
        });
      });
    });
  });

  describe('/PUT/:id accessories', () => {
    it('it should UPDATE a accessory with the given id', (done) =>{
      const access = new Accessory({ title: "TestAccess", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'});
      access.save((err, access) => {
        request(app)
        .put('/api/accessories/' + access.id)
        .set('Authorization', 'Bearer ' + token)
        .field('Content-Type', 'multipart/form-data')
        .field({id: access.id, title:'TestAccess', discription:'test'})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Update Accessory successful!');
          done();
        })
      });
    });
  });

  describe('/DELETE/:id accessory', () => {
    it('it should DELETE  a accessory with the given id', (done) => {
      const access = new Accessory({ title: "TestAccess", discription: 'test content', imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'});
      access.save((err, access4) => {
        request(app)
        .delete('/api/accessories/' + access.id)
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Accessory deleted!');
          done();
        })
      })
    });
  });
});

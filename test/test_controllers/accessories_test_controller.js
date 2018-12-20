var request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../Backend/app');
var request = require('supertest');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var should = chai.should();
const Accessory = mongoose.model('Accessory');
// const Accessory = require('../../Backend/models/accessory.model');

chai.use(chaiHttp);

// describe('Accessory controller', () => {
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

//     access1 = new Accessory({
//       title: 'Test1',
//       discription: 'test Description',
//       imagePath: 'http://127.0.0.1:54146/images/horizonzero.jpg-1545298875649.jpg'
// 		});

// 		access2 = new Accessory({
// 			title: 'Test2',
//       discription: 'test 2 Description',
//       imagePath: 'http://127.0.0.1:54146/images/horizonzero.jpg-1545298875649.jpg'
// 		});

// 		Promise.all([access1.save(), access2.save()])
// 			.then(() => done());
// 	});

//   it('GET to /api/accessories reads all the games', done => {
//     request(app)
//     .get('/api/accessories')
//     .end(function(err, res) {
//       expect(res.statusCode).to.equal(200);
//       done();
//     });
//   });

//   it('Get /api/accessories to read one game', done => {
//     request(app)
//     .get('/api/accessories/' + game2._id)
//     .end(function(err, res) {
//       console.log(res.body)
//       expect(res.statusCode).to.equal(200);
//       done();
//     });
//   });

//   it('Post /api/accessories to create one game', function(done) {
//     request(app)
//     .post('/api/accessories')
//     .set('Authorization', 'Bearer ' + token)
//     .field('Content-Type', 'multipart/form-data')
//     .field({_id:'5c1b6313ee1ce542e0911f92',title:'newAccess', discription:'content'})
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


describe('Accessory Controller', () => {
    var token = null;
  beforeEach((done) => {
    Accessory.remove({}, (err) => {
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
      .post('/api/accessories/')
      .set('Authorization', 'Bearer ' + token)
      .field('Content-Type', 'multipart/form-data')
      .field({title:'TestAccess', discription:'test'})
      //when adding image to test change the path to fit your computer
      .attach('image', 'images/hyperx.jpg')
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.statusCode).to.equal(201);
        res.body.should.have.property('message').eql('Accessory added successfully');
        done();
      });
    });
  });

  describe('/Get/:id accessory', () => {
    it('it should Get a accessory by the given id', (done) => {
      var access2 = new Accessory({
        title: "TestAccess",
        discription: 'test content',
        imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'
      });
      access2.save((err, access2) => {
        request(app)
        .get('/api/accessories/' + access2.id)
        .send(access2)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('_id').eql(access2.id);
          done();
        });
      });
    });
  });

  describe('/PUT/:id accessories', () => {
    it('it should UPDATE a accessory with the given id', (done) =>{
      var access3 = new Accessory({
        title: "TestAccess",
        discription: 'test content',
        imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'
      });
      access3.save((err, access3) => {
        request(app)
        .put('/api/accessories/' + access3.id)
        .set('Authorization', 'Bearer ' + token)
        .field('Content-Type', 'multipart/form-data')
        .field({id: access3.id, title:'TestAccess', discription:'test'})
      //when adding image to test change the path to fit your computer
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Update successful!');
          done();
        })
      });
    });
  });

  describe('/DELETE/:id accessory', () => {
    it('it should DELETE  a accessory with the given id', (done) => {
      var access4 = new Accessory({
        title: "TestAccess",
        discription: 'test content',
        imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'
      });
      access4.save((err, access4) => {
        request(app)
        .delete('/api/accessories/' + access4.id)
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          console.log(res.body)
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Accessory deleted!');
          done();
        })
      })
    });
  });
});

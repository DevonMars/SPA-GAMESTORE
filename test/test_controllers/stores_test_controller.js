// var request = require('supertest');
// const mongoose = require('mongoose');
// const app = require('../../Backend/app');
// var request = require('supertest');
// var chai = require('chai');
// var chaiHttp = require('chai-http');
// var expect = chai.expect;
// var should = chai.should();
// const Store = mongoose.model('store')
// const Game = mongoose.model('Game');
// const Accessory = mongoose.model('Accessory');

// chai.use(chaiHttp);

// describe('Store Controller', () => {
//   var token = null;

//   beforeEach((done) => {
//     Store.deleteMany({}, (err) => {
//       Game.deleteMany({}, (err) => {
//         Accessory.deleteMany({}, (err) => {
//           done();
//         });
//       });
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

//   describe('/Get Stores', () => {
//     it('should Get All the stores', (done) => {
//       chai.request(app)
//       .get('/api/stores')
//       .end(function(err, res) {
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//     });
//   });
//   describe('/Get Store', () => {
//     it('it should Get a store by the given id', (done) => {
//       const game1 = new Game({title: 'testgame', discription: 'sdsdaa', imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'});
//       const access1 = new Accessory({title: 'accessdsda', discription: 'gamesdad', imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'});
//       game1.save();
//       access1.save();

//       var store1 = new Store({
//         title: "testStore",
//         address: 'test address',
//         games: game1.id,
//         accessories: access1.id
//       });
//       store1.save((err, store1) => {
//         request(app)
//         .get('/api/stores/' + store1.id)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.have.property('_id').eql(store1.id);
//           done();
//         });
//       });
//     });
//   });

//   describe('/Post Store', () => {
//     const game1 = new Game({title: 'testgame', discription: 'sdsdaa', imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'});
//     const access1 = new Accessory({title: 'accessdsda', discription: 'gamesdad', imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'});
//     game1.save();
//     access1.save();
//     it('it should post a store', (done) => {
//       request(app)
//       .post('/api/stores')
//       .set('Authorization', 'Bearer ' + token)
//       .send({title:'Test', address:'sdsdadsdsad', games: game1.id, accessories: access1.id})
//       .expect(201)
//       .end(function(err, res) {
//         if (err) return done(err);
//         expect(res.statusCode).to.equal(201);
//         res.body.should.have.property('message').eql('Store added successfully');
//         done();
//       });
//     });
//   });

//   describe('/PUT/:id store', () => {
//     it('it should UPDATE a store with the given id', (done) =>{
//       const game1 = new Game({title: 'testgame', discription: 'sdsdaa', imagePath: 'http://127.0.0.1:56314/images/horizonzero.jpg-1545306332493.jpg'});
//       const access1 = new Accessory({title: 'accessdsda', discription: 'gamesdad', imagePath: 'http://127.0.0.1:56314/images/hyperx.jpg-1545306332493.jpg'});
//       game1.save();
//       access1.save();
//       const store = new Store({title: 'TestShop', address: 'Freeza Planet 195', games: game1.id, accessories: access1.id});
//       store.save((err, store) => {
//         request(app)
//         .put('/api/stores/' + store._id)
//         .set('Authorization', 'Bearer ' + token)
//         .send({id: store.id, discription:'test'})
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.have.property('message').eql('Update successful!');
//           done();
//         })
//       });
//     });
//   });

//   describe('/Delete/:id store', () => {
//     it('it should Delete a store with the given id', (done) =>{
//       const store = new Store({title: 'TestShop', address: 'Freeza Planet 195'});
//       store.save((err, store) => {
//         request(app)
//         .delete('/api/stores/' + store._id)
//         .set('Authorization', 'Bearer ' + token)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.have.property('message').eql('Store deleted!');
//           done();
//         })
//       });
//     });
//   });
// })


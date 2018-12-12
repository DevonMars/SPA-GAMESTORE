// const assert = require('assert');
// const request = require('supertest');
// const jwt = require('jsonwebtoken');
// const checkAuth = require('../../Backend/middleware/check-auth');
// const extractFile = require('../../Backend/middleware/file');
// const mongoose = require('mongoose');
// const app = require('../../Backend/app');

// const Game = mongoose.model('Game');

// let token;

//     before((done) => {
//       request(app)
//         .post('/login')
//         .send({
//           email: 'test@user.com',
//           password: 'password',
//         })
//         .end((err, response) => {
//           token = response.body.token; // save the token!
//           done();
//         });
//     });

// describe('Game controller', () => {
//   it('GET to /api/Games reads all the animes', done => {
//       Game.countDocuments().then(count => {
//         request(app)
//         .get('/api/games')
//         .end(() => {
//           Game.countDocuments().then(newCount => {
//             assert(count === newCount);
//             done();
//           });
//         });
//       });
//     });

//     it('POST to /api/games creates a new game', done => {
//       Game.countDocuments().then(count => {
//           request(app)
//               .post('/api/games')
//               .set('Authorization', `Bearer ${token}`)
//               .send({
//                   title: 'game1',
//                   description: 'I am king'
//               })
//               .then((res) => {
//                 expect(res.body).to.have.property('token');
//                 token = `Bearer ${res.body.token}`
//                 .end(() => {
//                   Game.countDocuments().then(newCount => {
//                       assert(count + 1 === newCount);
//                       done();
//                   });
//               });
//             });
//           });
//         })
//       });


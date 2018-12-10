const assert = require('assert');
const request = require('supertest');
const checkAuth = require('../../Backend/middleware/check-auth');
const extractFile = require('../../Backend/middleware/file');
const app = require('../../Backend/app');

describe('Game controller', () => {
  it('Post to /api/games creates a new game', done => {
    request(app)
    .post('/api/games'), checkAuth, extractFile
    .send({ title: 'Kingdom Hearts'})
    .end(() => {
      done();
    })
  });
})

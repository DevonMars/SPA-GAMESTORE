const assert = require('assert');
const request = require('supertest');
const checkAuth = require('../../Backend/middleware/check-auth');
const extractFile = require('../../Backend/middleware/file');
const mongoose = require('mongoose');
const app = require('../../Backend/app');

const Game = mongoose.model('Game');

describe('Game controller', () => {
  it('GET to /api/Games reads all the animes', done => {
      Game.countDocuments().then(count => {
        request(app)
        .get('/api/games')
        .end(() => {
          Game.countDocuments().then(newCount => {
            assert(count === newCount);
            done();
          });
        });
      });
    });
    
});


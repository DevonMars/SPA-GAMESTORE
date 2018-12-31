const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const mongodb = require('../Backend/config/mongo.db.connector');

before(() => {
    mongoose.disconnect();
    mongodb.createTestConnection();
});


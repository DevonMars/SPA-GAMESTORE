const mongoose = require('mongoose');
const config = require('./mongo.db');

mongoose.Promise = global.Promise;

function createDevConnection() {
    mongoose.connect(config.dburl_dev, { useNewUrlParser: true });
    var connection = mongoose.connection
        .once('open', () => console.log('Connected to Mongo on Mongo Atlas locally'))
        .on('error', (error) => {
            console.warn('Warning', error.toString());
        });
}

function createTestConnection() {
    mongoose.connect(config.dburl_test, { useNewUrlParser: true })
    var connection = mongoose.connection
        .once('open', () => console.log('Connected to Mongo on localhost to test'))
        .on('error', (error) => {
            console.warn('Warning', error.toString());
        });
}

var connection = mongoose.connection

module.exports = {
    connection,
    createDevConnection,
    createTestConnection
}

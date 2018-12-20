// const mongoose = require('mongoose');

// before(done => {
//   mongoose.connect('mongodb+srv://devAdmin:pWDxaP3XshZP3-y@cluster0-bxeix.mongodb.net/SPAGamingStoreDB_test', { useNewUrlParser: true })
//   .then(() => {
//     console.log('Connected to Test Database!')
//   })
//   mongoose.connection
//     .once('open', () => done())
//     .on('error', error => {
//       console.warn('Warning', error);
//     });
// });

// beforeEach(done => {
//   const { games } = mongoose.connection.collections;
//   games.drop()
//     .then(() => done())
//     .catch(() => done());
// });


const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const mongodb = require('../Backend/config/mongo.db.connector');

before(() => {
    mongoose.disconnect();
    mongodb.createTestConnection();
});

// beforeEach((done) => {
// 	const {games, stores, accessories } = mongoose.connection.collections;
// 	games.drop(() => {
// 		stores.drop(() => {
// 			accessories.drop(() => {
//         done();
// 			});
// 		});
// 	});
// });

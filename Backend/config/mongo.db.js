var env = {
  dbHost: process.env.DB_HOST || 'mongodb+srv',
  dbPort: process.env.DB_PORT || '',
  dbUser: process.env.DB_USER || '',
  dbPassword: process.env.MONGO_ATLAS_PW || 'pWDxaP3XshZP3-y',
  dbDatabase: process.env.DB_DATABASE || 'SPAGamingStoreDB'
}


var dburl = process.env.NODE_ENV === 'production' ?
    'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase :
    'mongodb://localhost/' + env.dbDatabase


var dburl_dev = 'mongodb+srv://devAdmin:' + process.env.MONGO_ATLAS_PW + '@cluster0-bxeix.mongodb.net/SPAGamingStoreDB?retryWrites=true';

var dburl_test = 'mongodb+srv://devAdmin:' + process.env.MONGO_ATLAS_PW + '@cluster0-bxeix.mongodb.net/SPAGamingStoreDB_test?retryWrites=true';


module.exports = {
  env,
  dburl_test,
  dburl_dev
};

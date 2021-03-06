const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
var mongodb = require('./config/mongo.db.connector');
const gamesRoutes = require("./routes/game_routes");
const storesRoutes = require("./routes/store_routes");
const accessoriesRoutes = require("./routes/accessory_routes");
const userRoutes = require('./routes/user_routes');

const app = express();

// mongoose.Promise = global.Promise;
// if (process.env.NODE_ENV !== 'test') {
//   mongoose.connect('mongodb+srv://devAdmin:' + process.env.MONGO_ATLAS_PW + '@cluster0-bxeix.mongodb.net/SPAGamingStoreDB?retryWrites=true', { useNewUrlParser: true })
//   .then(() => {
//     console.log('Connected to Database!')
//   })
//   .catch(() => {
//     console.log('Connection failed!')
//   });
//   mongoose.set('useCreateIndex', true);
// };


var env = process.argv[2] || 'dev';
switch (env) {
    case 'dev':
      mongodb.createDevConnection();
      break;
    case 'test':
      mongodb.createTestConnection();
      break;
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/games", gamesRoutes);
app.use("/api/stores", storesRoutes);
app.use("/api/accessories", accessoriesRoutes);
app.use('/api/user', userRoutes);

module.exports = app;

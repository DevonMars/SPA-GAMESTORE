const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const moongoose =require('mongoose');
const gamesRoutes = require("./routes/game_routes");
const storesRoutes = require("./routes/store_routes");
const accessoriesRoutes = require("./routes/accessory_routes");
const userRoutes = require('./routes/user_routes');

const app = express();

moongoose.connect('mongodb+srv://devAdmin:pWDxaP3XshZP3-y@cluster0-bxeix.mongodb.net/SPAGamingStoreDB?retryWrites=true', { useNewUrlParser: true })
.then(() => {
  console.log('Connected to Database!')
})
.catch(() => {
  console.log('Connection failed!')
});
moongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("Backend/images")));

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

app.get('/api', (req, res) => {
  res.send({ hi: 'there'});
});



app.use("/api/games", gamesRoutes);
app.use("/api/stores", storesRoutes);
app.use("/api/accessories", accessoriesRoutes);
app.use('/api/user', userRoutes);

module.exports = app;

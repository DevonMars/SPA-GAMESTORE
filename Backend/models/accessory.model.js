const mongoose = require('mongoose');

const accessorySchema = mongoose.Schema({
  title: {type: String, required: true},
  discription: { type: String, required: true},
  imagePath: { type: String, required: true}
});


module.exports = mongoose.model('Accessory', accessorySchema);

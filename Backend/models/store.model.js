const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    title: {type: String, required: true, unique: true},
    address: {type: String, required: true},
    games: [{
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }]
}, {
    timestamps: true
});

const Store = mongoose.model('store', StoreSchema);

module.exports = Store;

var mongoose = require('../controllers/db');
var cardsSchema = require('./cards');

var collectionsSchema = new mongoose.Schema({
  collectionName: String,
  cards: [cardsSchema]
});

var Collection = mongoose.model('Collection', collectionsSchema);

module.exports = Collection;
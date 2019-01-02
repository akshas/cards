var mongoose = require('../controllers/db');

var Schema = new mongoose.Schema({
  name: String
});

var Collection = mongoose.model('Collection', Schema);

module.exports = Collection;
var mongoose = require('../controllers/db');
var cardsSchema = new mongoose.Schema({
  site1: String,
  site2: String,
  pile: Number
});

// create collection model
var Word = mongoose.model('Word', cardsSchema);

module.exports = Word;
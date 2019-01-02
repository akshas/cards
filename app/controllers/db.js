var mongoose = require('mongoose');
var db = 'mongodb://localhost/cards';
mongoose.connect(db, function (err, db) {

}, {
  useNewUrlParser: true
});


mongoose.connection.on('open', function () {
  // mongoose.connect.getCollectionInfos();
  console.log('connected');

});

mongoose.connection.on('error', function (error) {
  throw new Error(error);

});

module.exports = mongoose;
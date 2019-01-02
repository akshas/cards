
var mongoose = require('mongoose');
var db = 'mongodb://akshas:Zh18z81ujlf@ds257590.mlab.com:57590/cards';
mongoose.connect(db, function(err, db) {

});


mongoose.connection.on('open', function() {
    // mongoose.connect.getCollectionInfos();
});

mongoose.connection.on('error', function (error) {
  throw new Error(error);

});

module.exports = mongoose;
// body parser
var bodyParser = require('body-parser');

// collection cards
var Words = require('../models/cards');

// list of collections
var Collections = require('../models/collections');



module.exports = function (app) {

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  /**
   *  ROUTS
   */

  // index
  app.get('/', function (req, res) {
    Collections.find({}, function (err, data) {
      if (err) throw err;

      res.render('index', {
        test: 3,
        collections: data
      });
    });
  });

  // create rout
  app.get('/card-create', function (req, res) {
    var newItem = Words.find({}, function (err, data) {
      if (err) throw err;

      res.render('create', {
        cards: data
      });
    });
  });

  // post rout (card create)
  app.post('/card-create', function (req, res) { // поменять на cardCreat. / - будет создание коллекиций карточек и их список на экране 

    Words(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  // cards rout
  // app.get('/cards', function (req, res) {
  //   Words.find({}, function(err, data) {
  //     if (err) throw err;
  //     res.render('piles', {cards: data});
  //   });
  // });  


  // piles rout
  app.get('/pile:id', function (req, res) {
    var id = req.params.id;
    if (id <= 5) {
      Words.find({
        pile: id
      }, function (err, data) {
        if (err) throw err; // обработать нормально ошибку 
        if (data !== '') {
          res.render('cards', {
            id: id,
            cards: data
          });
        }
      });
    } else {
      res.send('page not found');
    }
  });


  // dynamic rout
  app.get('/:coll', function (req, res) {

    var param = req.params.coll;
    Collections.findOne({
      "name": param
    }, function (err, data) {

      if (err) {
        console.log('not found');
        res.send('404 not found');
      }

      if (data != null) {
        console.log(data);
        res.render('piles', {
          cards: data
        });
      }
    });
  });

};
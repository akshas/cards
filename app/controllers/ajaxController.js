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

  /**
   *  действия на главной странице
   */
  // index 
  app.get('/', function (req, res) {

    Collections.find({}, function (err, data) {

      if (err) throw err;

      // console.log(Collections(req.body));


      res.render('index', {
        collections: data
      });

    });
  });


  //createCollection rout
  app.post('/', function (req, res) {
    Collections(req.body).save(function (err, data) {

      if (err) throw err;

      res.json(data);
    });

  });
  //delete Collection rout
  app.delete('/', function (req, res) {

    Collections.findOneAndDelete({
      _id: req.body.id
    }, function (err, data) {

      if (err) throw err;

      res.json(data);
    });

  });

  // update Collection rout
  app.put('/', function (req, res) {

    Collections.findOneAndUpdate({
      _id: req.body.id
    }, {
      collectionName: req.body.newName
    }, function (err, data) {
      if (err) throw err;

      res.json(data);
    });

  });

  /**
   *  Действия на странице одной из коллекций (возможность создания карточки, вывод 5 стопок)
   */
  // get one collection
  app.get('/collection/:name', function (req, res) {

    var name = req.params.name;

    Collections.findOne({
      collectionName: name
    }, function (err, data) {

      if (err) throw err;

      if (data) {

        res.render('createWord', {
          name: name,
          collection: data
        });

      } else {
        res.send('нет такой страницы');
      }

    });

  });

  // post rout (card create)
  app.put('/collection/:name', function (req, res) { // поменять на cardCreat. / - будет создание коллекиций карточек и их список на экране

    var param = req.params.name;
    Collections.findOne({
      collectionName: param
    }, function (err, data) {
      if (err) throw err;
      /**
       * в req.body попадает по json объект созданный в  main.js на 28 строке
       */
      data.cards.push(req.body);

      data.save();
      res.json(data);
    });

  });

  // piles rout
  app.get('/:collection/pile:id', function (req, res) {
    var collection = req.params.collection;
    var id = req.params.id;
    var path = collection + '/pile' + id;
    if (id <= 5) {
      Collections.findOne({
        collectionName: collection,
      }, function (err, data) {
        if (err) throw err; // обработать нормально ошибку 
        if (data !== '') {
          var pile = data.cards.filter(function (cards) {
            return cards.pile == id;
          });
          res.render('onePile', {
            id: id,
            collection: collection,
            cards: pile
          });
        }
      });
    } else {
      res.send('page not found');
    }
  });


  // обработка случаяного урла
  app.get('/:something', function (req, res) {

    var param = req.params.something;
    console.log(param);
    Collections.findOne({
      collectionName: param
    }, function (err, data) {

      if (err) {
        console.err(err);
        res.send('404 not found');
      }
      if (data != null) {
        res.send(param);
      } else {
        // console.log('nothing found');
        res.send('404 not found');
      }
    });
  });

};
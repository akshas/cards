// express init
var express = require('express');
var app = express();

// require routs
var ajaxController = require('./controllers/ajaxController');

// path
var path = require('path');

// set up views and view engine
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug");

// static files
app.use(express.static('./public'));

// init routs
ajaxController(app);

// lounch server on port: 3000
app.listen(3000);

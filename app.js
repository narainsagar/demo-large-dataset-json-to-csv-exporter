'use strict';

var express = require('express');
var app = express();
var routes = require('./routes/index.js');
// Here we are configuring express to use body-parser as middle-ware.

app.set('views', __dirname + '/public');
app.set('view engine', 'jade');

app.use('/public', express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/', routes);

app.listen(5000);
console.log('ui started on port %s', 5000);

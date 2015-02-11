'use strict';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var debug = require('debug')('ALAdmin');
var favicon = require('serve-favicon');



var testData = require('./testData/testData.json');
var testDefaultItem =  require('./testData/testDefaultItem.json');
var testPubStruct = require('./testData/testPublicationStructure.json');
var testTemplate = require('./testData/testTemplate.json');


var app = express();
var env = process.env.NODE_ENV || 'development';
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));
app.use(favicon(__dirname + '/app/favicon.ico'));



app.get('/getAll', function (req, res) {
    res.send(testData);
});
app.get('/getpubStruct', function (req, res) {
    res.send(testPubStruct);
});
app.get('/getTemplate', function (req, res) {
    res.send(testTemplate);
});
app.get('/getDefaultItem', function (req, res) {
    res.send(testDefaultItem);
});
app.post('/updateItem', function (req, res) {

    //must actually update model!
    console.log(req.body.updates);
    res.send('200');
});

app.post('/updatePubStruct', function (req, res) {

    //must actually update model!
    console.log(req.body);
    res.send('200');
});

//temporary fix for testing only
var item;
app.post('/addNewItem', function (req, res) {

    //must actually update model!
    console.log(req.body);
    res.send('200');
    item = req.body
});
app.get('/getItem', function (req, res) {

    //must actually update model!
    console.log(req.query.id);
    res.send(item);
});
app.get('*', function (req, res) {
  res.redirect('/');
});


app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
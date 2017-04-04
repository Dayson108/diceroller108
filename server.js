var express = require('express'),   
app = express();
var bodyParser = require('body-parser');


var http = require('http');
var server = http.createServer(app);

var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

//var bcrypt = require('bcryptjs');

//npm install bcrypt-nodejs
//var bcrypt = require('require("./bCrypt");');

var db;
var DMCODE = "samplecode";

var InitList = [];
var Characters = [];
var CharacterStats = [];
var DMID;
var SocketAddressBook = [];


// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// set the home page route
app.get('/', function(req, res) {
	// ejs render automatically looks in the views folder
	res.render('index', {ErrorMsg: JSON.stringify("Shake It")});
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});
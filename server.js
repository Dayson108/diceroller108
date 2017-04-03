var express = require('express'),   
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server),
bcrypt = require('bcryptjs');
app.use('/', express.static(__dirname + '/'));
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

var ObjectId = require('mongodb').ObjectID;
console.log("Starting");
server.listen(process.env.PORT || 3000);
console.log("Listening");

var db;
var DMCODE = "samplecode";

var InitList = [];
var Characters = [];
var CharacterStats = [];
var DMID;
var SocketAddressBook = [];




// set the view engine to ejs
app.set('view engine', 'ejs');

// set the home page route
app.get('/', function(req, res) {
	// ejs render automatically looks in the views folder
	res.render('index', {ErrorMsg: JSON.stringify("Pepper Steak")});
});

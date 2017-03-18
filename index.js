/*
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
app.use('/', express.static(__dirname + '/'));
var io = require('socket.io').listen(server);
app.use(bodyParser.urlencoded({extended: true}));
var mongodb = require('mongodb');
*/
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



mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://dayson108:5tarw1nd@ds139278.mlab.com:39278/heroku_cjk61411', function(err, database){
	console.log("DB connected");
	db = database;
});


//app.get('/', function(req, res){
//  res.sendFile(__dirname + '/Views/Main.html');
//});



app.get('/', function(req, res){
  res.sendFile(__dirname + '/Views/Main.html');
});

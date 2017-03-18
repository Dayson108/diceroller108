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


//drd108's database
//mongodb.MongoClient.connect('mongodb://dayson108:5tarw1nd@ds147797.mlab.com:47797/heroku_8xmzgt7g', function(err, database){

//diceroller108's database
//mongodb.MongoClient.connect('mongodb://dayson108:5tarw1nd@ds139278.mlab.com:39278/heroku_cjk61411', function(err, database){
mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://dayson108:5tarw1nd@ds139278.mlab.com:39278/heroku_cjk61411', function(err, database){
	server.listen(process.env.PORT || 3000);
	console.log("listening");
	
	
	app.post('/comment', function(req, res){
		database.collection('comment').save(req.body, function(err, result){
			if(err){return console.log(err)};
			res.redirect('/test');
		});
	});
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

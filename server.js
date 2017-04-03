var express = require('express');
var app = express();
//var http = require('http');
//var server = http.createServer(app);
//var io = require('socket.io').listen(server);
//var bcrypt = require('bcryptjs');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// set the home page route
app.get('/', function(req, res) {
	// ejs render automatically looks in the views folder
	res.render('index', {ErrorMsg: JSON.stringify("Bacon")});
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});
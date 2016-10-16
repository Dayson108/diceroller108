var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(process.env.PORT || 3000);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
     console.log('user disconnected');
  });

  socket.on('test', function(msg){
     console.log(msg.thing);
     //socket.broadcast.emit('test2', msg.thing);
	io.sockets.emit('test2', msg.thing);
  });

	socket.on('sidedDiceRoll', function(msg){
		console.log(msg.name);
		socket.broadcast.emit('sidedDiceResult', msg);
	});
	socket.on('20DiceRoll', function(msg){
		socket.broadcast.emit('20DiceResult', msg);
	});
});




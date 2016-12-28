var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
app.use('/', express.static(__dirname + '/'));
var io = require('socket.io').listen(server);
app.use(bodyParser.urlencoded({extended: true}));
var mongodb = require('mongodb');

var Players = [];

var PlayerList = [];
var PlayerIndex = 0;


var InitList = [];
var DMData = {
	CName: "",
	PName: "",
	ID: ""
};


//drd108's database
//mongodb.MongoClient.connect('mongodb://dayson108:5tarw1nd@ds147797.mlab.com:47797/heroku_8xmzgt7g', function(err, database){

//diceroller108's database
mongodb.MongoClient.connect('mongodb://dayson108:5tarw1nd@ds139278.mlab.com:39278/heroku_cjk61411', function(err, database){
	server.listen(process.env.PORT || 3000);
	console.log("listening");
	
	
	app.post('/comment', function(req, res){
		database.collection('comment').save(req.body, function(err, result){
			if(err){return console.log(err)};
			res.redirect('/test');
		});
	});
});

app.get('/test', function(req, res){
  res.sendFile(__dirname + '/html/Comment.html');
});
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

function findPlayersIndex(socket){
		for(var i = 0; i < Players.length; i++){
			if(Players[i].playerID == socket){
				return i;
			}
		}		
}


io.on('connection', function(socket){
	io.to(socket.id).emit('SendStartingData', socket.id, DMData, PlayerList, InitList);
	//Recieved by everyone EXCEPT sender 
	//socket.broadcast.emit('', msg);
	
	//Recieved by everyone
	//io.sockets.emit('', msg);
	
	//io.to(socketid).emit('message', 'for your eyes only');
		
	socket.on('disconnect', function(){
		if(socket.id != DMData.ID){
			var rmvIndex = findPlayersIndex(socket.id);
			Players.splice(rmvIndex, 1);
			io.to(DMData.ID).emit('RcvDMData', Players);
		}
		
		
		//Removes from the player list*******
		if(socket.id == DMData.ID){
			DMData.CName = "";
			DMData.PName = "";
			DMData.ID = "";
			io.sockets.emit('ClearDM', DMData); 
		}
		else{
			var i = 0;
			var index = -1;
			for (i = 0; i < PlayerList.length; i++){
				if(PlayerList[i].playerID == socket.id){
					index = i;
				}
			}
			if(index >= 0){
				PlayerList.splice(index, 1);
			}
		}
		io.sockets.emit('UpdatePlayerList', PlayerList);			
		//***********************************
		

	});
	
	socket.on('UpdatePlayer', function(iChar){
		var index = findPlayersIndex(socket.id);
		Players[index] = iChar;
		io.to(DMData.ID).emit('RcvDMData', Players);
	});
		
		
	socket.on('sidedDiceRoll', function(msg){
		socket.broadcast.emit('sidedDiceResult', msg);
	});
	 
	socket.on('20DiceRoll', function(msg){
		socket.broadcast.emit('20DiceResult', msg);
	});
	
	socket.on('DMSubmitted', function(msg){
		DMData.CName = msg.CName;
		DMData.PName = msg.PName;
		DMData.ID = socket.id;
		io.sockets.emit('UpdateDM', DMData, PlayerList);
		io.to(DMData.ID).emit('RcvDMData', Players);
	});
	
	socket.on('AddPlayer', function(msg){
		var temp = msg;
		Players.push(msg);
		if(DMData.ID){
			io.to(DMData.ID).emit('UpdatePlayerStats', Players);
			io.to(DMData.ID).emit('RcvDMData', Players);
		}	
	});


	socket.on('playerSubmitted', function(msg){
		var newPlayer = {
			charName: msg.CName,
			playerName: msg.PName,
			playerID: socket.id
		};
	
		PlayerList.push(newPlayer);
		io.sockets.emit('UpdatePlayerList', PlayerList);
		
	});
	
	socket.on('Test', function(){
		//console.log("");
		//console.log('Testing...');
	});
	
	socket.on('SendPvtMsg', function(msgToId, msg){
		io.to(msgToId).emit('PvtMsgRcv', msg);
	});
	

	
	
	socket.on('InitRoll', function(input){
		InitList.push(input);
		io.sockets.emit('ServerUpdateInitList', InitList);
	});

	socket.on('ClearInit', function(){
		InitList = [];
		io.sockets.emit('ClearInitRecieved');
	});	
	
	socket.on('ChatMsgSend', function(msg){
		io.sockets.emit('ChatMsgRcv', msg);
	});



});


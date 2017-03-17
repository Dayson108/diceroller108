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
	console.log("DB connected ");
	db = database;
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/Views/Main.html');
});

/*
mainSocket.broadcast.emit('', msg);
mainSocket.emit('', msg);
mainSocket.to(socketid).emit('', msg);

	//Recieved by everyone EXCEPT sender 
	//socket.broadcast.emit('', msg);
	
	//Recieved by everyone
	//io.sockets.emit('', msg);
	
	//io.to(socketid).emit('message', 'for your eyes only');
*/

var mainSocket = io.of('/Main');
mainSocket.on('connection', function(socket){
	console.log('someone connected to Main');
    
	socket.on('disconnect', function(){ 
        console.log('Someone disconnected from Main.');
    });
	

	socket.on('InitRoll', function(iCharacterName, iDice, iStatus){ 
		var initRoll = {
			roll: iDice,
			CName: iCharacterName,
			msg: iCharacterName + ': ' + iDice,
			status: iStatus,
			socket: socket.id
		}
		if(iStatus == 1){
			msg = "**" + msg + "**";
			
		}else if(iStatus == -1){
			msg = '--' + msg + '--';
		}
		
		InitList.push(initRoll);
		InitList.sort(function(a,b){return b.roll > a.roll});
		mainSocket.emit('InitRcv', InitList);
    });
		
	socket.on('ClearInit', function(){
		mainSocket.emit('ReleaseInit');
		InitList = [];
		mainSocket.emit('InitRcv', InitList);
	});

	socket.on('DMRemoveInit', function(num){	
		if(InitList[num].socket != "Public" && InitList[num].socket != "Private"){
			mainSocket.to(InitList[num].socket).emit('ReleaseInit');
		}
		
		InitList.splice(num, 1);
		mainSocket.emit('InitRcv', InitList);
	});
		
	socket.on('DMInitRoll', function(iCharacterName, iDice, iStatus, type){ 
		var initRoll = {
			roll: iDice,
			CName: iCharacterName,
			msg: iCharacterName + ': ' + iDice,
			status: iStatus,
			socket: type
		}

		if(iStatus == 1){
			initRoll.msg = "**" + initRoll.msg + "**";
			
		}else if(iStatus == -1){
			initRoll.msg = '--' + initRoll.msg + '--';
		}
		
		if(type == "Private"){
			initRoll.msg = "(P) " + initRoll.msg;
		}
		
		InitList.push(initRoll);
		InitList.sort(function(a,b){return b.roll > a.roll});
		mainSocket.emit('InitRcv', InitList);
    });
	
	socket.on('DMChangeInit', function(num, modifiedInit){
		InitList[num] = modifiedInit;
		InitList.sort(function(a,b){return b.roll > a.roll});
		mainSocket.emit('InitRcv', InitList);
	});	
		
	socket.on('ChatMsgSend', function(msg){
		mainSocket.emit('ChatMsgRcv', msg);
	});
	
	
	//socket.emit('PrivateMsgSend', toSocket, msg);
	socket.on('PrivateMsgSend', function(toSocket, msg){
		mainSocket.to(toSocket).emit('ChatMsgRcv', msg);
	
	});
	
	socket.on('DMJoined', function(iDMName, iToolSocketId){
		var DMStats = {
			MainSocket: socket.id,
			ToolSocket: iToolSocketId,
			PlayerName: iDMName
		}
		
		DMID = DMStats;
		mainSocket.emit('DMDataRecieved', DMID);
		
	});		
	
	socket.on('LinkSockets', function(ToolSocketId, iCharName, iPlayerName){
		var PlayerRecord = {
			CharacterName: iCharName,
			PlayerName: iPlayerName,
			ToolSocket: ToolSocketId,
			MainSocket: socket.id
		}
		SocketAddressBook.push(PlayerRecord);
		toolSocket.to(PlayerRecord.ToolSocket).emit('RcvMainSocketId', socket.id);
		
	});
});


function getToolSocket(mainSocket){
	for(var i = 0; i < SocketAddressBook.length; i++){
		if(SocketAddressBook[i].MainSocket == mainSocket){
			return SocketAddressBook[i].ToolSocket;
		}
	}
}
function getMainSocket(toolSocket){
	for(var i = 0; i < SocketAddressBook.length; i++){
		if(SocketAddressBook[i].ToolSocket == toolSocket){
			return SocketAddressBook[i].MainSocket;
		}
	}
}

/*
All but sender
toolSocket.broadcast.emit('', msg);

All
toolSocket.emit('', msg);

Whisper
toolSocket.to(socketid).emit('', msg);
*/
var toolSocket = io.of('/Tool');
toolSocket.on('connection', function(socket){
	console.log('someone connected to tool');

	socket.on('disconnect', function(){ 
		console.log('Someone disconnected from tool:' + socket.id);
		
		
		//var SocketAddressBook = [];
		//var Characters = [];ToolSocket
		//var CharacterStats = [];
		
		for(var i = 0; i < SocketAddressBook.length; i++){
			if(socket.id == SocketAddressBook[i].ToolSocket){
				SocketAddressBook.splice(i,1);
				break;
			}
		}
		for(var i = 0; i < Characters.length; i++){
			if(socket.id == Characters[i].ToolSocket){
				Characters.splice(i,1);
				break;
			}
		}
		
		for(var i = 0; i < CharacterStats.length; i++){
			if(socket.id == CharacterStats[i].ToolSocket){
				CharacterStats.splice(i,1);
				break;
			}
		}
		if(DMID != undefined){	
			toolSocket.to(DMID.ToolSocket).emit('DMCharacterListUpdate', Characters);
		}
		
		//toolSocket.emit('UpdatePlayerStats', CharacterStats);
		toolSocket.emit('PlayerChange', CharacterStats, SocketAddressBook);
		
	});
	
	socket.on('SubmitCharacter', function(iCharacter, iMainSocketId, iToolSocketId){ 
		console.log("Character Joined");
		
		characterRecord = {
			character: iCharacter,
			MainSocket: iMainSocketId,
			ToolSocket: iToolSocketId	
		}

		var characterStat= {
			CharacterName: iCharacter.CharacterName,
			PlayerName: iCharacter.PlayerName,
			Class: iCharacter.Class,
			Level: iCharacter.Level,
			MaxHP: iCharacter.MaxHP,
			CurrentHP: iCharacter.MaxHP,
			MaxTempHP: 0,
			CurrentTempHP: 0,
			AC: iCharacter.AC,
			ACMod: 0,
			SpellsRemaining: "",
			Notes: "",
			MainSocket: iMainSocketId,
			ToolSocket: iToolSocketId			
		}
		
		Characters.push(characterRecord);
		CharacterStats.push(characterStat);
		if(DMID != undefined){	
			toolSocket.to(DMID.ToolSocket).emit('DMCharacterListUpdate', Characters);
		}
		
		//Send Starting Data Here
		mainSocket.to(socket.id).emit('InitRcv', InitList);
		
		//toolSocket.emit('UpdatePlayerStats', CharacterStats);
		toolSocket.emit('PlayerChange', CharacterStats, SocketAddressBook);
				
	});
	
	socket.on('StartData', function(){
		toolSocket.to(socket.id).emit('StartingDataRcv', socket.id);
	});
	
	socket.on('GetDMStartData', function(){
		//Send Starting Data Here
		//mainSocket.to(socket.id).emit('InitRcv', InitList);
		
		//toolSocket.emit('UpdatePlayerStats', CharacterStats);
		toolSocket.emit('PlayerChange', CharacterStats, SocketAddressBook);
	});
		
	socket.on('UpdateServerStats', function(iStats){
		for(var i = 0; i < CharacterStats.length; i++){
			if(CharacterStats[i].ToolSocket == socket.id){
				CharacterStats[i].CurrentHP = iStats.CurrentHP;
				CharacterStats[i].CurrentTempHP = iStats.TempHP;
				CharacterStats[i].MaxTempHP = iStats.TempMaxHP;
				CharacterStats[i].ACMod = iStats.ACMod;
				break;
			}
		}
		
		toolSocket.emit('UpdatePlayerStats', CharacterStats);
	});

});

var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

//var bcrypt = require('bcryptjs');
var bcrypt = require('bcryptjs');

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



app.get('/', function(req, res){
  //res.sendFile(__dirname + '/index.ejs');
  res.render(__dirname + '/views/index.ejs', {ErrorMsg: JSON.stringify("Lemon")});
});

app.get('/Login', function(req, res){
	res.render(__dirname + '/Views/Login.ejs', {ErrorMsg: JSON.stringify("")});
});

mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://dayson108:5tarw1nd@ds139278.mlab.com:39278/heroku_cjk61411', function(err, database){
	console.log("DB connected");
	db = database;
});



app.post('/SaveCharacter', function(req, res){
	var playerName = req.body.PlayerName;
	var CollectionName = req.body.username + "_Characters";
	db.collection(CollectionName).save(req.body, function(err, result){
		if(err){return console.log(err)};
		db.collection(CollectionName).find().toArray(function(err, result2){
			if (err) return console.log(err);
			res.render(__dirname + '/Views/CharScreen', {Characters: JSON.stringify(result2), iPlayerName: JSON.stringify(playerName)});
		});	
	});
});

app.post('/EditCharacter', function(req, res){
	collectionName = req.body.username + "_Characters";
	
	db.collection(collectionName).update({_id: ObjectId(req.body.charID)}, 
	{$set: {
		CharacterName: req.body.CharacterName, 
		Level: req.body.Level,
		Race: req.body.Race,
		Class: req.body.Class,
		AC: req.body.AC,
		MaxHP: req.body.MaxHP,
		STR: req.body.STR,
		DEX: req.body.DEX,
		CON: req.body.CON,
		INT: req.body.INT,
		WIS: req.body.WIS,
		CHA: req.body.CHA,
		AcrobaticsProf: req.body.AcrobaticsProf,
		InsightProf: req.body.InsightProf,
		PerformanceProf: req.body.PerformanceProf,
		AnimalHandlingProf: req.body.AnimalHandlingProf,
		IntimidationProf: req.body.IntimidationProf,
		PersuasionProf: req.body.PersuasionProf,
		ArcanaProf: req.body.ArcanaProf,
		InvestigationProf: req.body.InvestigationProf,
		ReligionProf: req.body.ReligionProf,
		AthleticsProf: req.body.AthleticsProf,
		MedicineProf: req.body.MedicineProf,
		SleightOfHandProf: req.body.SleightOfHandProf,
		DeceptionProf: req.body.DeceptionProf,
		NatureProf: req.body.NatureProf,
		StealthProf: req.body.StealthProf,
		HistoryProf: req.body.HistoryProf,
		PerceptionProf: req.body.PerceptionProf,
		SurvivalProf: req.body.SurvivalProf,
		STRProf: req.body.STRProf,
		DEXProf: req.body.DEXProf,
		CONProf: req.body.CONProf,
		INTProf: req.body.INTProf,
		WISProf: req.body.WISProf,
		CHAProf: req.body.CHAProf,
		ProfBonus: req.body.ProfBonus
		}});

	db.collection(collectionName).find().toArray(function(err, result){
		if (err) return console.log(err);
		res.render(__dirname + '/Views/CharScreen', {Characters: JSON.stringify(result), iPlayerName: JSON.stringify(playerName)});
	});	
});

app.post('/DnDTool', function(req, res){
	res.render(__dirname + '/Views/DnDTool.ejs', {Msg: JSON.stringify("")});
});

app.get('/Spellbook', function(req, res){
	res.render(__dirname + '/Views/Spellbook.ejs', {ErrorMsg: JSON.stringify("")});
});



app.post('/LoginAttempt', function(req, res){
	var playerFound = false;
	var DMFound = false;
	var account;
	var foundIndex;
	db.collection('Accounts').find().toArray(function(err, result){
		if (err) return console.log(err);
		for(var i = 0; i < result.length; i ++){
			if(req.body.username == result[i].username && bcrypt.compareSync(req.body.password, result[i].password)){
				playerName = result[i].PlayerName;
				if(result[i].AccountType == "Player"){
					playerFound = true;
				}else{
					DMFound = true;
					foundIndex = i;
				}
				break;	
			}
		}
		if(playerFound){
			console.log("meow");
			db.collection(req.body.username + "_Characters").find().toArray(function(err, result){
				if (err) return console.log(err);
				res.render(__dirname + '/Views/CharScreen', {Characters: JSON.stringify(result), iPlayerName: JSON.stringify(playerName)});
			});	
		}else if(DMFound){
			console.log("bark");
				res.render(__dirname + '/Views/DMTool', {DMName: JSON.stringify(result[foundIndex].PlayerName)});
			
		}else{
			console.log("woof");
			var msg = "Invalid Account Name / Password";
			res.render(__dirname + '/Views/index.ejs', {ErrorMsg: JSON.stringify(msg)});
		}
	});
});

app.post('/RegisterAccount', function(req, res){
	var submit = true;
	var playerName = req.body.PlayerName;
	db.collection('Accounts').find().toArray(function(err, result){
		if (err) return console.log(err);
		for(var i = 0; i < result.length; i ++){
			if(req.body.username == result[i].username){
				submit = false;
				break;
			}
		}
		if(submit){
			bcrypt.hash(req.body.password, 10, function(err, hash) {
				req.body.password = hash;
				db.collection('Accounts').save(req.body, function(err, result){
					if(err){return console.log(err)};
				});	
				res.render(__dirname + '/Views/CharScreen', {Characters: JSON.stringify(""), iPlayerName: JSON.stringify(playerName)});
			});
		}else{
			var msg = "Account Name Already Exists.  Please login or choose a different account name";
			res.render(__dirname + '/Views/Login.ejs', {ErrorMsg: JSON.stringify(msg)});
		}
	});
});

app.post('/RegisterDM', function(req, res){
	if(req.body.Passcode == DMCODE){
		var submit = true;
		db.collection('Accounts').find().toArray(function(err, result){
			if (err) return console.log(err);
			for(var i = 0; i < result.length; i ++){
				if(req.body.username == result[i].username){
					submit = false;
					break;
				}
			}
			if(submit){
				bcrypt.hash(req.body.password, 10, function(err, hash) {
					req.body.password = hash;
					db.collection('Accounts').save(req.body, function(err, result){
						if(err){return console.log(err)};
					});	
					res.render(__dirname + '/Views/DMTool.ejs', {DMName: JSON.stringify(req.body.PlayerName)});
				});
			}else{
				var msg = "Account Name Already Exists.  Please login or choose a different account name";
				res.render(__dirname + '/Views/Login.ejs', {ErrorMsg: JSON.stringify(msg)});
			}
		});	
	}else{
		var msg = "Invalid DM Code.  Please contact me to request access"
		res.render(__dirname + '/Views/Login.ejs', {ErrorMsg: JSON.stringify(msg)});
	}
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

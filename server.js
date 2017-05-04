var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var bcrypt = require('bcryptjs');

app.use('/', express.static(__dirname + '/'));
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

var ObjectId = require('mongodb').ObjectID;
var db;
var DMCODE = "samplecode";


var InitList = [];
var CharacterStats = [];
var AddressBook = [];
//var DMsocketId;

console.log("Starting");
server.listen(process.env.PORT || 3000);
console.log("Listening");



app.get('/', function(req, res){
  //res.sendFile(__dirname + '/index.ejs');
  res.render(__dirname + '/views/index.ejs', {ErrorMsg: JSON.stringify("Butter Cream")});
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
			db.collection(req.body.username + "_Characters").find().toArray(function(err, result){
				if (err) return console.log(err);
				res.render(__dirname + '/Views/CharScreen', {Characters: JSON.stringify(result), iPlayerName: JSON.stringify(playerName)});
			});	
		}else if(DMFound){
			res.render(__dirname + '/Views/DMTool', {DMName: JSON.stringify(result[foundIndex].PlayerName)});
		}else{
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
        console.log('Someone disconnected from tool.');
		
		//Remove Player from CharacterStats
		for(var i = 0; i < CharacterStats.length; i++){
			if(socket.id == CharacterStats[i].socketId){
				CharacterStats.splice(i,1);
				break;
			}
		}
		
		//Remove Player/DM from addressbook
		console.log("removing player: " + socket.id);
		for(var i = 0; i < AddressBook.length; i++){
			if(socket.id == AddressBook[i].socketId){
				console.log("removed from addressbook");
				AddressBook.splice(i,1);
			}
		}
		
		toolSocket.emit('UpdatePlayerStats', CharacterStats);
		toolSocket.emit('UpdateAddressBook', AddressBook);
    });
	
	socket.on('ChatMsgSend', function(msg){
		toolSocket.emit('ChatMsgRcv', msg);
	});
		
	socket.on('InitRoll', function(iCharacterName, iDice, iStatus){ 
	console.log("Init Recieved");
		var initRoll = {
			roll: iDice,
			CName: iCharacterName,
			msg: iCharacterName + ': ' + iDice,
			status: iStatus,
			socket: socket.id
		}
		if(iStatus == 1){
			initRoll.msg = "**" + initRoll.msg + "**";
			
		}else if(iStatus == -1){
			initRoll.msg = '--' + initRoll.msg + '--';
		}
		
		InitList.push(initRoll);
		InitList.sort(function(a,b){return b.roll > a.roll});
		toolSocket.emit('InitRcv', InitList);
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
		toolSocket.emit('InitRcv', InitList);
    });	
	
	
	socket.on('PlayerJoined', function(iCharacter){ 
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
			socketId: socket.id
		}
		
		var address = {
			CharacterName: iCharacter.CharacterName,
			PlayerName: iCharacter.PlayerName,
			socketId: socket.id
		}
		AddressBook.push(address);
		CharacterStats.push(characterStat);
		
		//Send Starting Data to User
		toolSocket.to(socket.id).emit('PlayerStartingData', socket.id, InitList);
		
		toolSocket.emit('UpdatePlayerStats', CharacterStats);
		toolSocket.emit('UpdateAddressBook', AddressBook);
	});
	
	socket.on('DMJoined', function(iName){ 
		//Send Starting Data to User
		var address = {
			CharacterName: "DM",
			PlayerName: iName,
			socketId: socket.id
		}
		AddressBook.push(address);
		
		
		toolSocket.to(socket.id).emit('DMStartingData', socket.id, InitList, CharacterStats);
		
		console.log("adding DM into addressbook");
		toolSocket.emit('UpdateAddressBook', AddressBook);
		//toolSocket.emit('UpdatePlayerStats', CharacterStats);
		//toolSocket.emit('PlayerChange', CharacterStats, SocketAddressBook);
	});	
	

		
	socket.on('ClearInit', function(){
		toolSocket.emit('ReleaseInit');
		InitList = [];
		toolSocket.emit('InitRcv', InitList);
	});
	
	
	socket.on('UpdateServerCharacterStats', function(iStats){
		var index = -1;
		for(var i = 0; i < CharacterStats.length; i++){
			if(CharacterStats[i].socketId == socket.id){
				CharacterStats[i].CurrentHP = iStats.CurrentHP;
				CharacterStats[i].CurrentTempHP = iStats.TempHP;
				CharacterStats[i].MaxTempHP = iStats.TempMaxHP;
				CharacterStats[i].ACMod = iStats.ACMod;
				index = i;
				break;
			}
		}
		toolSocket.emit('UpdatePlayerStats', CharacterStats);
	});
	
	


	socket.on('DMRemoveInit', function(num){	
		if(InitList[num].socket != "Public" && InitList[num].socket != "Private"){
			toolSocket.to(InitList[num].socket).emit('ReleaseInit');
		}
		
		InitList.splice(num, 1);
		toolSocket.emit('InitRcv', InitList);
	});
		

	
	socket.on('DMChangeInit', function(num, modifiedInit){
		InitList[num] = modifiedInit;
		InitList.sort(function(a,b){return b.roll > a.roll});
		toolSocket.emit('InitRcv', InitList);
	});	
		
	
	socket.on('PrivateMsgSend', function(toSocket, msg){
		console.log("Private message from: " + socket.id);
		console.log("Private message to: " + toSocket);
		
		//Add code to modify msg to contain senders name
		
		//toolSocket.to(toSocket).emit('ChatMsgRcv', msg);
	});
	
});



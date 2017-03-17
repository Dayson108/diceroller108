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

app.get('/Login', function(req, res){
	res.render(__dirname + '/Views/Login.ejs', {ErrorMsg: JSON.stringify("")});
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
			res.render(__dirname + '/Views/Login.ejs', {ErrorMsg: JSON.stringify(msg)});
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

app.get('/Spells/AbiDalzims_Horrid_Wilting', function(req, res){
	res.render(__dirname + '/Spells/AbiDalzims_Horrid_Wilting.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Absorb_Elements', function(req, res){
	res.render(__dirname + '/Spells/Absorb_Elements.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Acid_Splash', function(req, res){
	res.render(__dirname + '/Spells/Acid_Splash.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Aganazzars_Scorcher', function(req, res){
	res.render(__dirname + '/Spells/Aganazzars_Scorcher.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Aid', function(req, res){
	res.render(__dirname + '/Spells/Aid.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Alarm', function(req, res){
	res.render(__dirname + '/Spells/Alarm.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Alter_Self', function(req, res){
	res.render(__dirname + '/Spells/Alter_Self.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Animal_Friendship', function(req, res){
	res.render(__dirname + '/Spells/Animal_Friendship.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Animal_Messenger', function(req, res){
	res.render(__dirname + '/Spells/Animal_Messenger.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Animal_Shapes', function(req, res){
	res.render(__dirname + '/Spells/Animal_Shapes.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Animate_Dead', function(req, res){
	res.render(__dirname + '/Spells/Animate_Dead.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Animate_Objects', function(req, res){
	res.render(__dirname + '/Spells/Animate_Objects.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Antilife_Shell', function(req, res){
	res.render(__dirname + '/Spells/Antilife_Shell.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Antimagic_Field', function(req, res){
	res.render(__dirname + '/Spells/Antimagic_Field.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/AntipathySympathy', function(req, res){
	res.render(__dirname + '/Spells/AntipathySympathy.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Arcane_Eye', function(req, res){
	res.render(__dirname + '/Spells/Arcane_Eye.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Arcane_Gate', function(req, res){
	res.render(__dirname + '/Spells/Arcane_Gate.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Arcane_Lock', function(req, res){
	res.render(__dirname + '/Spells/Arcane_Lock.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Armor_of_Agathys', function(req, res){
	res.render(__dirname + '/Spells/Armor_of_Agathys.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Arms_of_Hadar', function(req, res){
	res.render(__dirname + '/Spells/Arms_of_Hadar.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Astral_Projection', function(req, res){
	res.render(__dirname + '/Spells/Astral_Projection.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Augury', function(req, res){
	res.render(__dirname + '/Spells/Augury.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Aura_of_Life', function(req, res){
	res.render(__dirname + '/Spells/Aura_of_Life.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Aura_of_Purity', function(req, res){
	res.render(__dirname + '/Spells/Aura_of_Purity.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Aura_of_Vitality', function(req, res){
	res.render(__dirname + '/Spells/Aura_of_Vitality.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Awaken', function(req, res){
	res.render(__dirname + '/Spells/Awaken.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Bane', function(req, res){
	res.render(__dirname + '/Spells/Bane.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Banishing_Smite', function(req, res){
	res.render(__dirname + '/Spells/Banishing_Smite.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Banishment', function(req, res){
	res.render(__dirname + '/Spells/Banishment.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Barkskin', function(req, res){
	res.render(__dirname + '/Spells/Barkskin.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Beacon_of_Hope', function(req, res){
	res.render(__dirname + '/Spells/Beacon_of_Hope.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Beast_Bond', function(req, res){
	res.render(__dirname + '/Spells/Beast_Bond.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Beast_Sense', function(req, res){
	res.render(__dirname + '/Spells/Beast_Sense.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Bestow_Curse', function(req, res){
	res.render(__dirname + '/Spells/Bestow_Curse.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Bigbys_Hand', function(req, res){
	res.render(__dirname + '/Spells/Bigbys_Hand.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Blade_Barrier', function(req, res){
	res.render(__dirname + '/Spells/Blade_Barrier.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Blade_Ward', function(req, res){
	res.render(__dirname + '/Spells/Blade_Ward.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Bless', function(req, res){
	res.render(__dirname + '/Spells/Bless.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Blight', function(req, res){
	res.render(__dirname + '/Spells/Blight.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Blinding_Smite', function(req, res){
	res.render(__dirname + '/Spells/Blinding_Smite.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/BlindnessDeafness', function(req, res){
	res.render(__dirname + '/Spells/BlindnessDeafness.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Blink', function(req, res){
	res.render(__dirname + '/Spells/Blink.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Blur', function(req, res){
	res.render(__dirname + '/Spells/Blur.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Bones_of_the_Earth', function(req, res){
	res.render(__dirname + '/Spells/Bones_of_the_Earth.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Booming_Blade', function(req, res){
	res.render(__dirname + '/Spells/Booming_Blade.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Branding_Smite', function(req, res){
	res.render(__dirname + '/Spells/Branding_Smite.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Burning_Hands', function(req, res){
	res.render(__dirname + '/Spells/Burning_Hands.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Call_Lightning', function(req, res){
	res.render(__dirname + '/Spells/Call_Lightning.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Calm_Emotions', function(req, res){
	res.render(__dirname + '/Spells/Calm_Emotions.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Catapult', function(req, res){
	res.render(__dirname + '/Spells/Catapult.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Chain_Lightning', function(req, res){
	res.render(__dirname + '/Spells/Chain_Lightning.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Charm_Person', function(req, res){
	res.render(__dirname + '/Spells/Charm_Person.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Chill_Touch', function(req, res){
	res.render(__dirname + '/Spells/Chill_Touch.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Chromatic_Orb', function(req, res){
	res.render(__dirname + '/Spells/Chromatic_Orb.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Circle_of_Death', function(req, res){
	res.render(__dirname + '/Spells/Circle_of_Death.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Circle_of_Power', function(req, res){
	res.render(__dirname + '/Spells/Circle_of_Power.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Clairvoyance', function(req, res){
	res.render(__dirname + '/Spells/Clairvoyance.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Clone', function(req, res){
	res.render(__dirname + '/Spells/Clone.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Cloud_of_Daggers', function(req, res){
	res.render(__dirname + '/Spells/Cloud_of_Daggers.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Cloudkill', function(req, res){
	res.render(__dirname + '/Spells/Cloudkill.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Color_Spray', function(req, res){
	res.render(__dirname + '/Spells/Color_Spray.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Command', function(req, res){
	res.render(__dirname + '/Spells/Command.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Commune', function(req, res){
	res.render(__dirname + '/Spells/Commune.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Commune_with_Nature', function(req, res){
	res.render(__dirname + '/Spells/Commune_with_Nature.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Compelled_Duel', function(req, res){
	res.render(__dirname + '/Spells/Compelled_Duel.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Comprehend_Languages', function(req, res){
	res.render(__dirname + '/Spells/Comprehend_Languages.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Compulsion', function(req, res){
	res.render(__dirname + '/Spells/Compulsion.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Cone_of_Cold', function(req, res){
	res.render(__dirname + '/Spells/Cone_of_Cold.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Confusion', function(req, res){
	res.render(__dirname + '/Spells/Confusion.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Conjure_Animals', function(req, res){
	res.render(__dirname + '/Spells/Conjure_Animals.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Conjure_Barrage', function(req, res){
	res.render(__dirname + '/Spells/Conjure_Barrage.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Conjure_Celestial', function(req, res){
	res.render(__dirname + '/Spells/Conjure_Celestial.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Conjure_Elemental', function(req, res){
	res.render(__dirname + '/Spells/Conjure_Elemental.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Conjure_Fey', function(req, res){
	res.render(__dirname + '/Spells/Conjure_Fey.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Conjure_Minor_Elementals', function(req, res){
	res.render(__dirname + '/Spells/Conjure_Minor_Elementals.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Conjure_Volley', function(req, res){
	res.render(__dirname + '/Spells/Conjure_Volley.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Conjure_Woodland_Beings', function(req, res){
	res.render(__dirname + '/Spells/Conjure_Woodland_Beings.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Contact_Other_Plane', function(req, res){
	res.render(__dirname + '/Spells/Contact_Other_Plane.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Contagion', function(req, res){
	res.render(__dirname + '/Spells/Contagion.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Contingency', function(req, res){
	res.render(__dirname + '/Spells/Contingency.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Continual_Flame', function(req, res){
	res.render(__dirname + '/Spells/Continual_Flame.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Control_Flames', function(req, res){
	res.render(__dirname + '/Spells/Control_Flames.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Control_Water', function(req, res){
	res.render(__dirname + '/Spells/Control_Water.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Control_Weather', function(req, res){
	res.render(__dirname + '/Spells/Control_Weather.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Control_Winds', function(req, res){
	res.render(__dirname + '/Spells/Control_Winds.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Cordon_of_Arrows', function(req, res){
	res.render(__dirname + '/Spells/Cordon_of_Arrows.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Counterspell', function(req, res){
	res.render(__dirname + '/Spells/Counterspell.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Create_Bonfire', function(req, res){
	res.render(__dirname + '/Spells/Create_Bonfire.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Create_Food_and_Water', function(req, res){
	res.render(__dirname + '/Spells/Create_Food_and_Water.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Create_or_Destroy_Water', function(req, res){
	res.render(__dirname + '/Spells/Create_or_Destroy_Water.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Create_Undead', function(req, res){
	res.render(__dirname + '/Spells/Create_Undead.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Creation', function(req, res){
	res.render(__dirname + '/Spells/Creation.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Crown_of_Madness', function(req, res){
	res.render(__dirname + '/Spells/Crown_of_Madness.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Crusaders_Mantle', function(req, res){
	res.render(__dirname + '/Spells/Crusaders_Mantle.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Cure_Wounds', function(req, res){
	res.render(__dirname + '/Spells/Cure_Wounds.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Dancing_Lights', function(req, res){
	res.render(__dirname + '/Spells/Dancing_Lights.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Darkness', function(req, res){
	res.render(__dirname + '/Spells/Darkness.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Darkvision', function(req, res){
	res.render(__dirname + '/Spells/Darkvision.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Daylight', function(req, res){
	res.render(__dirname + '/Spells/Daylight.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Death_Ward', function(req, res){
	res.render(__dirname + '/Spells/Death_Ward.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Delayed_Blast_Fireball', function(req, res){
	res.render(__dirname + '/Spells/Delayed_Blast_Fireball.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Demiplane', function(req, res){
	res.render(__dirname + '/Spells/Demiplane.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Destructive_Wave', function(req, res){
	res.render(__dirname + '/Spells/Destructive_Wave.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Detect_Evil_and_Good', function(req, res){
	res.render(__dirname + '/Spells/Detect_Evil_and_Good.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Detect_Magic', function(req, res){
	res.render(__dirname + '/Spells/Detect_Magic.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Detect_Poison_and_Disease', function(req, res){
	res.render(__dirname + '/Spells/Detect_Poison_and_Disease.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Detect_Thoughts', function(req, res){
	res.render(__dirname + '/Spells/Detect_Thoughts.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Dimension_Door', function(req, res){
	res.render(__dirname + '/Spells/Dimension_Door.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Disguise_Self', function(req, res){
	res.render(__dirname + '/Spells/Disguise_Self.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Disintegrate', function(req, res){
	res.render(__dirname + '/Spells/Disintegrate.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Dispel_Evil_and_Good', function(req, res){
	res.render(__dirname + '/Spells/Dispel_Evil_and_Good.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Dispel_Magic', function(req, res){
	res.render(__dirname + '/Spells/Dispel_Magic.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Dissonant_Whispers', function(req, res){
	res.render(__dirname + '/Spells/Dissonant_Whispers.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Divination', function(req, res){
	res.render(__dirname + '/Spells/Divination.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Divine_Favor', function(req, res){
	res.render(__dirname + '/Spells/Divine_Favor.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Divine_Word', function(req, res){
	res.render(__dirname + '/Spells/Divine_Word.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Dominate_Beast', function(req, res){
	res.render(__dirname + '/Spells/Dominate_Beast.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Dominate_Monster', function(req, res){
	res.render(__dirname + '/Spells/Dominate_Monster.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Dominate_Person', function(req, res){
	res.render(__dirname + '/Spells/Dominate_Person.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Drawmijs_Instant_Summons', function(req, res){
	res.render(__dirname + '/Spells/Drawmijs_Instant_Summons.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Dream', function(req, res){
	res.render(__dirname + '/Spells/Dream.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Druidcraft', function(req, res){
	res.render(__dirname + '/Spells/Druidcraft.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Dust_Devil', function(req, res){
	res.render(__dirname + '/Spells/Dust_Devil.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Earth_Tremor', function(req, res){
	res.render(__dirname + '/Spells/Earth_Tremor.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Earthbind', function(req, res){
	res.render(__dirname + '/Spells/Earthbind.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Earthquake', function(req, res){
	res.render(__dirname + '/Spells/Earthquake.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Eldritch_Blast', function(req, res){
	res.render(__dirname + '/Spells/Eldritch_Blast.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Elemental_Bane', function(req, res){
	res.render(__dirname + '/Spells/Elemental_Bane.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Elemental_Weapon', function(req, res){
	res.render(__dirname + '/Spells/Elemental_Weapon.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Enhance_Ability', function(req, res){
	res.render(__dirname + '/Spells/Enhance_Ability.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/EnlargeReduce', function(req, res){
	res.render(__dirname + '/Spells/EnlargeReduce.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Ensnaring_Strike', function(req, res){
	res.render(__dirname + '/Spells/Ensnaring_Strike.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Entangle', function(req, res){
	res.render(__dirname + '/Spells/Entangle.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Enthrall', function(req, res){
	res.render(__dirname + '/Spells/Enthrall.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Erupting_Earth', function(req, res){
	res.render(__dirname + '/Spells/Erupting_Earth.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Etherealness', function(req, res){
	res.render(__dirname + '/Spells/Etherealness.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Evards_Black_Tentacles', function(req, res){
	res.render(__dirname + '/Spells/Evards_Black_Tentacles.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Expeditious_Retreat', function(req, res){
	res.render(__dirname + '/Spells/Expeditious_Retreat.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Eyebite', function(req, res){
	res.render(__dirname + '/Spells/Eyebite.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Fabricate', function(req, res){
	res.render(__dirname + '/Spells/Fabricate.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Faerie_Fire', function(req, res){
	res.render(__dirname + '/Spells/Faerie_Fire.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/False_Life', function(req, res){
	res.render(__dirname + '/Spells/False_Life.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Fear', function(req, res){
	res.render(__dirname + '/Spells/Fear.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Feather_Fall', function(req, res){
	res.render(__dirname + '/Spells/Feather_Fall.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Feeblemind', function(req, res){
	res.render(__dirname + '/Spells/Feeblemind.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Feign_Death', function(req, res){
	res.render(__dirname + '/Spells/Feign_Death.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Find_Familiar', function(req, res){
	res.render(__dirname + '/Spells/Find_Familiar.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Find_Steed', function(req, res){
	res.render(__dirname + '/Spells/Find_Steed.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Find_the_Path', function(req, res){
	res.render(__dirname + '/Spells/Find_the_Path.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Find_Traps', function(req, res){
	res.render(__dirname + '/Spells/Find_Traps.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Finger_of_Death', function(req, res){
	res.render(__dirname + '/Spells/Finger_of_Death.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Fire_Bolt', function(req, res){
	res.render(__dirname + '/Spells/Fire_Bolt.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Fire_Shield', function(req, res){
	res.render(__dirname + '/Spells/Fire_Shield.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Fire_Storm', function(req, res){
	res.render(__dirname + '/Spells/Fire_Storm.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Fireball', function(req, res){
	res.render(__dirname + '/Spells/Fireball.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Flame_Arrows', function(req, res){
	res.render(__dirname + '/Spells/Flame_Arrows.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Flame_Blade', function(req, res){
	res.render(__dirname + '/Spells/Flame_Blade.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Flame_Strike', function(req, res){
	res.render(__dirname + '/Spells/Flame_Strike.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Flaming_Sphere', function(req, res){
	res.render(__dirname + '/Spells/Flaming_Sphere.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Flesh_to_Stone', function(req, res){
	res.render(__dirname + '/Spells/Flesh_to_Stone.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Fly', function(req, res){
	res.render(__dirname + '/Spells/Fly.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Fog_Cloud', function(req, res){
	res.render(__dirname + '/Spells/Fog_Cloud.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Forbiddance', function(req, res){
	res.render(__dirname + '/Spells/Forbiddance.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Forcecage', function(req, res){
	res.render(__dirname + '/Spells/Forcecage.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Foresight', function(req, res){
	res.render(__dirname + '/Spells/Foresight.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Freedom_of_Movement', function(req, res){
	res.render(__dirname + '/Spells/Freedom_of_Movement.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Friends', function(req, res){
	res.render(__dirname + '/Spells/Friends.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Frostbite', function(req, res){
	res.render(__dirname + '/Spells/Frostbite.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Gaseous_Form', function(req, res){
	res.render(__dirname + '/Spells/Gaseous_Form.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Gate', function(req, res){
	res.render(__dirname + '/Spells/Gate.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Geas', function(req, res){
	res.render(__dirname + '/Spells/Geas.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Gentle_Repose', function(req, res){
	res.render(__dirname + '/Spells/Gentle_Repose.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Giant_Insect', function(req, res){
	res.render(__dirname + '/Spells/Giant_Insect.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Glibness', function(req, res){
	res.render(__dirname + '/Spells/Glibness.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Globe_of_Invulnerability', function(req, res){
	res.render(__dirname + '/Spells/Globe_of_Invulnerability.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Glyph_of_Warding', function(req, res){
	res.render(__dirname + '/Spells/Glyph_of_Warding.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Goodberry', function(req, res){
	res.render(__dirname + '/Spells/Goodberry.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Grasping_Vine', function(req, res){
	res.render(__dirname + '/Spells/Grasping_Vine.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Grease', function(req, res){
	res.render(__dirname + '/Spells/Grease.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Greater_Invisibility', function(req, res){
	res.render(__dirname + '/Spells/Greater_Invisibility.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Greater_Restoration', function(req, res){
	res.render(__dirname + '/Spells/Greater_Restoration.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/GreenFlame_Blade', function(req, res){
	res.render(__dirname + '/Spells/GreenFlame_Blade.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Guardian_of_Faith', function(req, res){
	res.render(__dirname + '/Spells/Guardian_of_Faith.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Guards_and_Wards', function(req, res){
	res.render(__dirname + '/Spells/Guards_and_Wards.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Guidance', function(req, res){
	res.render(__dirname + '/Spells/Guidance.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Guiding_Bolt', function(req, res){
	res.render(__dirname + '/Spells/Guiding_Bolt.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Gust', function(req, res){
	res.render(__dirname + '/Spells/Gust.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Gust_of_Wind', function(req, res){
	res.render(__dirname + '/Spells/Gust_of_Wind.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Hail_of_Thorns', function(req, res){
	res.render(__dirname + '/Spells/Hail_of_Thorns.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Hallow', function(req, res){
	res.render(__dirname + '/Spells/Hallow.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Hallucinatory_Terrain', function(req, res){
	res.render(__dirname + '/Spells/Hallucinatory_Terrain.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Harm', function(req, res){
	res.render(__dirname + '/Spells/Harm.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Haste', function(req, res){
	res.render(__dirname + '/Spells/Haste.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Heal', function(req, res){
	res.render(__dirname + '/Spells/Heal.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Healing_Word', function(req, res){
	res.render(__dirname + '/Spells/Healing_Word.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Heat_Metal', function(req, res){
	res.render(__dirname + '/Spells/Heat_Metal.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Hellish_Rebuke', function(req, res){
	res.render(__dirname + '/Spells/Hellish_Rebuke.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Heroes_Feast', function(req, res){
	res.render(__dirname + '/Spells/Heroes_Feast.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Heroism', function(req, res){
	res.render(__dirname + '/Spells/Heroism.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Hex', function(req, res){
	res.render(__dirname + '/Spells/Hex.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Hold_Monster', function(req, res){
	res.render(__dirname + '/Spells/Hold_Monster.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Hold_Person', function(req, res){
	res.render(__dirname + '/Spells/Hold_Person.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Holy_Aura', function(req, res){
	res.render(__dirname + '/Spells/Holy_Aura.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Hunger_of_Hadar', function(req, res){
	res.render(__dirname + '/Spells/Hunger_of_Hadar.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Hunters_Mark', function(req, res){
	res.render(__dirname + '/Spells/Hunters_Mark.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Hypnotic_Pattern', function(req, res){
	res.render(__dirname + '/Spells/Hypnotic_Pattern.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Ice_Knife', function(req, res){
	res.render(__dirname + '/Spells/Ice_Knife.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Ice_Storm', function(req, res){
	res.render(__dirname + '/Spells/Ice_Storm.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Identify', function(req, res){
	res.render(__dirname + '/Spells/Identify.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Illusory_Script', function(req, res){
	res.render(__dirname + '/Spells/Illusory_Script.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Immolation', function(req, res){
	res.render(__dirname + '/Spells/Immolation.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Imprisonment', function(req, res){
	res.render(__dirname + '/Spells/Imprisonment.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Incendiary_Cloud', function(req, res){
	res.render(__dirname + '/Spells/Incendiary_Cloud.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Inflict_Wounds', function(req, res){
	res.render(__dirname + '/Spells/Inflict_Wounds.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Insect_Plague', function(req, res){
	res.render(__dirname + '/Spells/Insect_Plague.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Investiture_of_Flame', function(req, res){
	res.render(__dirname + '/Spells/Investiture_of_Flame.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Investiture_of_Ice', function(req, res){
	res.render(__dirname + '/Spells/Investiture_of_Ice.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Investiture_of_Stone', function(req, res){
	res.render(__dirname + '/Spells/Investiture_of_Stone.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Investiture_of_Wind', function(req, res){
	res.render(__dirname + '/Spells/Investiture_of_Wind.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Invisibility', function(req, res){
	res.render(__dirname + '/Spells/Invisibility.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Jump', function(req, res){
	res.render(__dirname + '/Spells/Jump.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Knock', function(req, res){
	res.render(__dirname + '/Spells/Knock.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Legend_Lore', function(req, res){
	res.render(__dirname + '/Spells/Legend_Lore.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Leomunds_Secret_Chest', function(req, res){
	res.render(__dirname + '/Spells/Leomunds_Secret_Chest.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Leomunds_Tiny_Hut', function(req, res){
	res.render(__dirname + '/Spells/Leomunds_Tiny_Hut.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Lesser_Restoration', function(req, res){
	res.render(__dirname + '/Spells/Lesser_Restoration.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Levitate', function(req, res){
	res.render(__dirname + '/Spells/Levitate.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Light', function(req, res){
	res.render(__dirname + '/Spells/Light.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Lightning_Arrow', function(req, res){
	res.render(__dirname + '/Spells/Lightning_Arrow.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Lightning_Bolt', function(req, res){
	res.render(__dirname + '/Spells/Lightning_Bolt.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Lightning_Lure', function(req, res){
	res.render(__dirname + '/Spells/Lightning_Lure.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Locate_Animals_or_Plants', function(req, res){
	res.render(__dirname + '/Spells/Locate_Animals_or_Plants.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Locate_Creature', function(req, res){
	res.render(__dirname + '/Spells/Locate_Creature.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Locate_Object', function(req, res){
	res.render(__dirname + '/Spells/Locate_Object.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Longstrider', function(req, res){
	res.render(__dirname + '/Spells/Longstrider.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Maelstrom', function(req, res){
	res.render(__dirname + '/Spells/Maelstrom.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Mage_Armor', function(req, res){
	res.render(__dirname + '/Spells/Mage_Armor.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Mage_Hand', function(req, res){
	res.render(__dirname + '/Spells/Mage_Hand.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Magic_Circle', function(req, res){
	res.render(__dirname + '/Spells/Magic_Circle.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Magic_Jar', function(req, res){
	res.render(__dirname + '/Spells/Magic_Jar.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Magic_Missile', function(req, res){
	res.render(__dirname + '/Spells/Magic_Missile.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Magic_Mouth', function(req, res){
	res.render(__dirname + '/Spells/Magic_Mouth.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Magic_Stone', function(req, res){
	res.render(__dirname + '/Spells/Magic_Stone.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Magic_Weapon', function(req, res){
	res.render(__dirname + '/Spells/Magic_Weapon.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Major_Image', function(req, res){
	res.render(__dirname + '/Spells/Major_Image.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Mass_Cure_Wounds', function(req, res){
	res.render(__dirname + '/Spells/Mass_Cure_Wounds.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Mass_Heal', function(req, res){
	res.render(__dirname + '/Spells/Mass_Heal.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Mass_Healing_Word', function(req, res){
	res.render(__dirname + '/Spells/Mass_Healing_Word.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Mass_Suggestion', function(req, res){
	res.render(__dirname + '/Spells/Mass_Suggestion.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Maximilians_Earthen_Grasp', function(req, res){
	res.render(__dirname + '/Spells/Maximilians_Earthen_Grasp.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Maze', function(req, res){
	res.render(__dirname + '/Spells/Maze.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Meld_into_Stone', function(req, res){
	res.render(__dirname + '/Spells/Meld_into_Stone.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Melfs_Acid_Arrow', function(req, res){
	res.render(__dirname + '/Spells/Melfs_Acid_Arrow.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Melfs_Minute_Meteors', function(req, res){
	res.render(__dirname + '/Spells/Melfs_Minute_Meteors.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Mending', function(req, res){
	res.render(__dirname + '/Spells/Mending.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Message', function(req, res){
	res.render(__dirname + '/Spells/Message.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Meteor_Swarm', function(req, res){
	res.render(__dirname + '/Spells/Meteor_Swarm.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Mind_Blank', function(req, res){
	res.render(__dirname + '/Spells/Mind_Blank.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Minor_Illusion', function(req, res){
	res.render(__dirname + '/Spells/Minor_Illusion.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Mirage_Arcane', function(req, res){
	res.render(__dirname + '/Spells/Mirage_Arcane.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Mirror_Image', function(req, res){
	res.render(__dirname + '/Spells/Mirror_Image.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Mislead', function(req, res){
	res.render(__dirname + '/Spells/Mislead.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Misty_Step', function(req, res){
	res.render(__dirname + '/Spells/Misty_Step.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Modify_Memory', function(req, res){
	res.render(__dirname + '/Spells/Modify_Memory.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Mold_Earth', function(req, res){
	res.render(__dirname + '/Spells/Mold_Earth.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Moonbeam', function(req, res){
	res.render(__dirname + '/Spells/Moonbeam.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Mordenkainens_Faithful_Hound', function(req, res){
	res.render(__dirname + '/Spells/Mordenkainens_Faithful_Hound.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Mordenkainens_Magnificent_Mansion', function(req, res){
	res.render(__dirname + '/Spells/Mordenkainens_Magnificent_Mansion.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Mordenkainens_Private_Sanctum', function(req, res){
	res.render(__dirname + '/Spells/Mordenkainens_Private_Sanctum.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Mordenkainens_Sword', function(req, res){
	res.render(__dirname + '/Spells/Mordenkainens_Sword.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Move_Earth', function(req, res){
	res.render(__dirname + '/Spells/Move_Earth.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Nondetection', function(req, res){
	res.render(__dirname + '/Spells/Nondetection.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Nystuls_Magic_Aura', function(req, res){
	res.render(__dirname + '/Spells/Nystuls_Magic_Aura.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Otilukes_Freezing_Sphere', function(req, res){
	res.render(__dirname + '/Spells/Otilukes_Freezing_Sphere.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Otilukes_Resilient_Sphere', function(req, res){
	res.render(__dirname + '/Spells/Otilukes_Resilient_Sphere.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Ottos_Irresistible_Dance', function(req, res){
	res.render(__dirname + '/Spells/Ottos_Irresistible_Dance.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Pass_Without_Trace', function(req, res){
	res.render(__dirname + '/Spells/Pass_Without_Trace.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Passwall', function(req, res){
	res.render(__dirname + '/Spells/Passwall.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Phantasmal_Force', function(req, res){
	res.render(__dirname + '/Spells/Phantasmal_Force.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Phantasmal_Killer', function(req, res){
	res.render(__dirname + '/Spells/Phantasmal_Killer.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Phantom_Steed', function(req, res){
	res.render(__dirname + '/Spells/Phantom_Steed.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Planar_Ally', function(req, res){
	res.render(__dirname + '/Spells/Planar_Ally.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Planar_Binding', function(req, res){
	res.render(__dirname + '/Spells/Planar_Binding.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Plane_Shift', function(req, res){
	res.render(__dirname + '/Spells/Plane_Shift.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Plant_Growth', function(req, res){
	res.render(__dirname + '/Spells/Plant_Growth.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Poison_Spray', function(req, res){
	res.render(__dirname + '/Spells/Poison_Spray.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Polymorph', function(req, res){
	res.render(__dirname + '/Spells/Polymorph.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Power_Word_Heal', function(req, res){
	res.render(__dirname + '/Spells/Power_Word_Heal.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Power_Word_Kill', function(req, res){
	res.render(__dirname + '/Spells/Power_Word_Kill.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Power_Word_Stun', function(req, res){
	res.render(__dirname + '/Spells/Power_Word_Stun.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Prayer_of_Healing', function(req, res){
	res.render(__dirname + '/Spells/Prayer_of_Healing.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Prestidigitation', function(req, res){
	res.render(__dirname + '/Spells/Prestidigitation.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Primordial_Ward', function(req, res){
	res.render(__dirname + '/Spells/Primordial_Ward.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Prismatic_Spray', function(req, res){
	res.render(__dirname + '/Spells/Prismatic_Spray.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Prismatic_Wall', function(req, res){
	res.render(__dirname + '/Spells/Prismatic_Wall.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Produce_Flame', function(req, res){
	res.render(__dirname + '/Spells/Produce_Flame.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Programmed_Illusion', function(req, res){
	res.render(__dirname + '/Spells/Programmed_Illusion.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Project_Image', function(req, res){
	res.render(__dirname + '/Spells/Project_Image.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Protection_from_Energy', function(req, res){
	res.render(__dirname + '/Spells/Protection_from_Energy.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Protection_from_Evil_and_Good', function(req, res){
	res.render(__dirname + '/Spells/Protection_from_Evil_and_Good.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Protection_from_Poison', function(req, res){
	res.render(__dirname + '/Spells/Protection_from_Poison.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Purify_Food_and_Drink', function(req, res){
	res.render(__dirname + '/Spells/Purify_Food_and_Drink.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Pyrotechnics', function(req, res){
	res.render(__dirname + '/Spells/Pyrotechnics.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Raise_Dead', function(req, res){
	res.render(__dirname + '/Spells/Raise_Dead.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Rarys_Telepathic_Bond', function(req, res){
	res.render(__dirname + '/Spells/Rarys_Telepathic_Bond.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Ray_of_Enfeeblement', function(req, res){
	res.render(__dirname + '/Spells/Ray_of_Enfeeblement.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Ray_of_Frost', function(req, res){
	res.render(__dirname + '/Spells/Ray_of_Frost.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Ray_of_Sickness', function(req, res){
	res.render(__dirname + '/Spells/Ray_of_Sickness.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Regenerate', function(req, res){
	res.render(__dirname + '/Spells/Regenerate.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Reincarnate', function(req, res){
	res.render(__dirname + '/Spells/Reincarnate.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Remove_Curse', function(req, res){
	res.render(__dirname + '/Spells/Remove_Curse.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Resistance', function(req, res){
	res.render(__dirname + '/Spells/Resistance.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Resurrection', function(req, res){
	res.render(__dirname + '/Spells/Resurrection.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Reverse_Gravity', function(req, res){
	res.render(__dirname + '/Spells/Reverse_Gravity.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Revivify', function(req, res){
	res.render(__dirname + '/Spells/Revivify.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Rope_Trick', function(req, res){
	res.render(__dirname + '/Spells/Rope_Trick.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Sacred_Flame', function(req, res){
	res.render(__dirname + '/Spells/Sacred_Flame.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Sanctuary', function(req, res){
	res.render(__dirname + '/Spells/Sanctuary.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Scorching_Ray', function(req, res){
	res.render(__dirname + '/Spells/Scorching_Ray.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Scrying', function(req, res){
	res.render(__dirname + '/Spells/Scrying.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Searing_Smite', function(req, res){
	res.render(__dirname + '/Spells/Searing_Smite.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/See_Invisibility', function(req, res){
	res.render(__dirname + '/Spells/See_Invisibility.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Seeming', function(req, res){
	res.render(__dirname + '/Spells/Seeming.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Sending', function(req, res){
	res.render(__dirname + '/Spells/Sending.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Sequester', function(req, res){
	res.render(__dirname + '/Spells/Sequester.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Shape_Water', function(req, res){
	res.render(__dirname + '/Spells/Shape_Water.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Shapechange', function(req, res){
	res.render(__dirname + '/Spells/Shapechange.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Shatter', function(req, res){
	res.render(__dirname + '/Spells/Shatter.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Shield', function(req, res){
	res.render(__dirname + '/Spells/Shield.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Shield_of_Faith', function(req, res){
	res.render(__dirname + '/Spells/Shield_of_Faith.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Shillelagh', function(req, res){
	res.render(__dirname + '/Spells/Shillelagh.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Shocking_Grasp', function(req, res){
	res.render(__dirname + '/Spells/Shocking_Grasp.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Silence', function(req, res){
	res.render(__dirname + '/Spells/Silence.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Silent_Image', function(req, res){
	res.render(__dirname + '/Spells/Silent_Image.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Simulacrum', function(req, res){
	res.render(__dirname + '/Spells/Simulacrum.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Skywrite', function(req, res){
	res.render(__dirname + '/Spells/Skywrite.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Sleep', function(req, res){
	res.render(__dirname + '/Spells/Sleep.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Sleet_Storm', function(req, res){
	res.render(__dirname + '/Spells/Sleet_Storm.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Slow', function(req, res){
	res.render(__dirname + '/Spells/Slow.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Snillocs_Snowball_Swarm', function(req, res){
	res.render(__dirname + '/Spells/Snillocs_Snowball_Swarm.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Spare_the_Dying', function(req, res){
	res.render(__dirname + '/Spells/Spare_the_Dying.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Speak_with_Animals', function(req, res){
	res.render(__dirname + '/Spells/Speak_with_Animals.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Speak_with_Dead', function(req, res){
	res.render(__dirname + '/Spells/Speak_with_Dead.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Speak_with_Plants', function(req, res){
	res.render(__dirname + '/Spells/Speak_with_Plants.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Spider_Climb', function(req, res){
	res.render(__dirname + '/Spells/Spider_Climb.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Spike_Growth', function(req, res){
	res.render(__dirname + '/Spells/Spike_Growth.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Spirit_Guardians', function(req, res){
	res.render(__dirname + '/Spells/Spirit_Guardians.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Spiritual_Weapon', function(req, res){
	res.render(__dirname + '/Spells/Spiritual_Weapon.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Staggering_Smite', function(req, res){
	res.render(__dirname + '/Spells/Staggering_Smite.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Stinking_Cloud', function(req, res){
	res.render(__dirname + '/Spells/Stinking_Cloud.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Stone_Shape', function(req, res){
	res.render(__dirname + '/Spells/Stone_Shape.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Stoneskin', function(req, res){
	res.render(__dirname + '/Spells/Stoneskin.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Storm_of_Vengeance', function(req, res){
	res.render(__dirname + '/Spells/Storm_of_Vengeance.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Storm_Sphere', function(req, res){
	res.render(__dirname + '/Spells/Storm_Sphere.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Suggestion', function(req, res){
	res.render(__dirname + '/Spells/Suggestion.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Sunbeam', function(req, res){
	res.render(__dirname + '/Spells/Sunbeam.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Sunburst', function(req, res){
	res.render(__dirname + '/Spells/Sunburst.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Swift_Quiver', function(req, res){
	res.render(__dirname + '/Spells/Swift_Quiver.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Sword_Burst', function(req, res){
	res.render(__dirname + '/Spells/Sword_Burst.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Symbol', function(req, res){
	res.render(__dirname + '/Spells/Symbol.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Tashas_Hideous_Laughter', function(req, res){
	res.render(__dirname + '/Spells/Tashas_Hideous_Laughter.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Telekinesis', function(req, res){
	res.render(__dirname + '/Spells/Telekinesis.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Telepathy', function(req, res){
	res.render(__dirname + '/Spells/Telepathy.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Teleport', function(req, res){
	res.render(__dirname + '/Spells/Teleport.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Teleportation_Circle', function(req, res){
	res.render(__dirname + '/Spells/Teleportation_Circle.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Tensers_Floating_Disk', function(req, res){
	res.render(__dirname + '/Spells/Tensers_Floating_Disk.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Thaumaturgy', function(req, res){
	res.render(__dirname + '/Spells/Thaumaturgy.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Thorn_Whip', function(req, res){
	res.render(__dirname + '/Spells/Thorn_Whip.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Thunderclap', function(req, res){
	res.render(__dirname + '/Spells/Thunderclap.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Thunderous_Smite', function(req, res){
	res.render(__dirname + '/Spells/Thunderous_Smite.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Thunderwave', function(req, res){
	res.render(__dirname + '/Spells/Thunderwave.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Tidal_Wave', function(req, res){
	res.render(__dirname + '/Spells/Tidal_Wave.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Time_Stop', function(req, res){
	res.render(__dirname + '/Spells/Time_Stop.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Tongues', function(req, res){
	res.render(__dirname + '/Spells/Tongues.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Transmute_Rock', function(req, res){
	res.render(__dirname + '/Spells/Transmute_Rock.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Transport_via_Plants', function(req, res){
	res.render(__dirname + '/Spells/Transport_via_Plants.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Trap_the_Soul', function(req, res){
	res.render(__dirname + '/Spells/Trap_the_Soul.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Tree_Stride', function(req, res){
	res.render(__dirname + '/Spells/Tree_Stride.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/True_Polymorph', function(req, res){
	res.render(__dirname + '/Spells/True_Polymorph.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/True_Resurrection', function(req, res){
	res.render(__dirname + '/Spells/True_Resurrection.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/True_Seeing', function(req, res){
	res.render(__dirname + '/Spells/True_Seeing.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/True_Strike', function(req, res){
	res.render(__dirname + '/Spells/True_Strike.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Tsunami', function(req, res){
	res.render(__dirname + '/Spells/Tsunami.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Unseen_Servant', function(req, res){
	res.render(__dirname + '/Spells/Unseen_Servant.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Vampiric_Touch', function(req, res){
	res.render(__dirname + '/Spells/Vampiric_Touch.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Vicious_Mockery', function(req, res){
	res.render(__dirname + '/Spells/Vicious_Mockery.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Vitriolic_Sphere', function(req, res){
	res.render(__dirname + '/Spells/Vitriolic_Sphere.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Wall_of_Fire', function(req, res){
	res.render(__dirname + '/Spells/Wall_of_Fire.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Wall_of_Force', function(req, res){
	res.render(__dirname + '/Spells/Wall_of_Force.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Wall_of_Ice', function(req, res){
	res.render(__dirname + '/Spells/Wall_of_Ice.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Wall_of_Sand', function(req, res){
	res.render(__dirname + '/Spells/Wall_of_Sand.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Wall_of_Stone', function(req, res){
	res.render(__dirname + '/Spells/Wall_of_Stone.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Wall_of_Thorns', function(req, res){
	res.render(__dirname + '/Spells/Wall_of_Thorns.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Wall_of_Water', function(req, res){
	res.render(__dirname + '/Spells/Wall_of_Water.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Warding_Bond', function(req, res){
	res.render(__dirname + '/Spells/Warding_Bond.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Warding_Wind', function(req, res){
	res.render(__dirname + '/Spells/Warding_Wind.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Water_Breathing', function(req, res){
	res.render(__dirname + '/Spells/Water_Breathing.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Water_Walk', function(req, res){
	res.render(__dirname + '/Spells/Water_Walk.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Watery_Sphere', function(req, res){
	res.render(__dirname + '/Spells/Watery_Sphere.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Web', function(req, res){
	res.render(__dirname + '/Spells/Web.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Weird', function(req, res){
	res.render(__dirname + '/Spells/Weird.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Whirlwind', function(req, res){
	res.render(__dirname + '/Spells/Whirlwind.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Wind_Walk', function(req, res){
	res.render(__dirname + '/Spells/Wind_Walk.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Wind_Wall', function(req, res){
	res.render(__dirname + '/Spells/Wind_Wall.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Wish', function(req, res){
	res.render(__dirname + '/Spells/Wish.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Witch_Bolt', function(req, res){
	res.render(__dirname + '/Spells/Witch_Bolt.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Word_of_Recall', function(req, res){
	res.render(__dirname + '/Spells/Word_of_Recall.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Wrathful_Smite', function(req, res){
	res.render(__dirname + '/Spells/Wrathful_Smite.ejs', {ErrorMsg: JSON.stringify("")});
});

app.get('/Spells/Zone_of_Truth', function(req, res){
	res.render(__dirname + '/Spells/Zone_of_Truth.ejs', {ErrorMsg: JSON.stringify("")});
});


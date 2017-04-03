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

console.log("Starting");
server.listen(process.env.PORT || 3000);
console.log("Listening");


var db;

mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://dayson108:5tarw1nd@ds139278.mlab.com:39278/heroku_cjk61411', function(err, database){
	console.log("DB connected");
	db = database;
	/*
	server.listen(process.env.PORT || 3000);
	console.log("Listening");
	*/
});

app.post('/SaveCharacter', function(req, res){
	console.log('Save Character Called');
	console.log(req.body);
	
	var test = "dayson108";
	var dbname = test + "Characters";
	db.collection(dbname).save(req.body, function(err, result){
	//db.collection('Characters').save(req.body, function(err, result){
		if(err){return console.log(err)};
		res.redirect('/CharScreen');
	});
});

app.get('/CharScreen', function(req, res){
	db.collection('Characters').find().toArray(function(err, result){
		if (err) return console.log(err);
		res.render(__dirname + '/CharScreen', {Characters: JSON.stringify(result)});
	});
});
app.get('/Login', function(req, res){
	//res.sendFile(__dirname + '/Login.ejs');
	res.render(__dirname + '/Login.ejs', {ErrorMsg: "none"});
});
app.get('/LoginAttempt', function(req, res){
	var userFound = false;
	//res.render(__dirname + '/Login.ejs', {ErrorMsg: "none"});
	db.collection('Accounts').find().toArray(function(err, result){
		if (err) return console.log(err);
		for(var i = 0; i < result.length; i ++){
			if(req.body.username == result[i].username && req.body.password == result[i].password){
				//User is logged in
				userFound = true;
				break;
			}
		}
		if(userFound){
			res.render(__dirname + '/CharScreen.ejs', {username: req.body.username});
		}else{
			res.render(__dirname + '/Login.ejs', {ErrorMsg: "Account Not Found"});
		}
		
		
		
		
	});
});


app.post('/RegisterAccount', function(req, res){

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
			

			
			db.collection('Accounts').save(req.body, function(err, result){
				if(err){return console.log(err)};
				res.redirect('/CharScreen');
				//res.render(__dirname + '/CharScreen', {username: req.body.username});
			});	
		}else{
			res.render(__dirname + '/Login.ejs', {ErrorMsg: "Account Name Already Exists"});
		}
		
		
	});
	

});




app.get('/', function(req, res){
  res.sendFile(__dirname + '/Main.html');
});

app.get('/Register', function(req, res){
  res.sendFile(__dirname + '/Register.html');
});


var chatSocket = io.of('/Chat');
chatSocket.on('connection', function(socket){
    console.log('someone connected to chat');
	
    socket.on('disconnect', function(){ 
        console.log('Someone disconnected from chat.');
    });
});

var toolSocket = io.of('/Tool');
toolSocket.on('connection', function(socket){
	console.log('someone connected to game');

	socket.on('disconnect', function(){ 
		console.log('Someone disconnected from game.');
	});
	
	socket.on('PassCheck', function(password){
		console.log("Pass Check Started");
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(password, salt);
		
		console.log("True: " +bcrypt.compareSync(password, hash));
		console.log("False: " +bcrypt.compareSync("Kaino", hash));
		
		console.log("sending");
		toolSocket.emit('RcvData', hash);
		console.log('sent');
	});
	
	
	
	socket.on('Pass2', function(iHash){
		console.log("");
		console.log("Pass2 Started");
		
		console.log("True: " +bcrypt.compareSync("Kain", iHash));
		console.log("False: " +bcrypt.compareSync("Kaino", iHash));
		
		
		

		
	});	
});

	

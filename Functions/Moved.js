


function resetAdv(){
	document.getElementById('AdvantageRadio').checked = false;
	document.getElementById('DisadvantageRadio').checked = false;
}


function DMRollInit(){
	var dice;
	var CharacterName = document.getElementById('InitRollName').value;
	document.getElementById('InitRollName').value = "";
	var status = 0;
	var type;
	if(document.getElementById('DMDiceInit').checked){
		var adv = 0;
		if(document.getElementById('AdvantageRadio').checked){
			adv = 1;
		}else if(document.getElementById('DisadvantageRadio').checked){
			adv = -1;
		}
		resetAdv();
		var dice = diceAdvCalc(adv, Math.floor((Math.random() * 20) + 1), Math.floor((Math.random() * 20) + 1));
		if(dice == 20){
			status = 1;
		}else if(dice == 1){
			status = -1;
		}
		dice +=	Number(document.getElementById('InitRollPlus').value);
		document.getElementById('InitRollPlus').value = "";
		
	}else if(document.getElementById('DMDSetInit').checked){
		dice = Number(document.getElementById('InitSetValue').value);
		document.getElementById('InitSetValue').value = "";
	}

	if(document.getElementById('PublicRadio').checked){
		socket.emit('DMInitRoll', CharacterName, dice, status, "Public");
	}else if (document.getElementById('PrivateRadio').checked){
		socket.emit('DMInitRoll', CharacterName, dice, status, "Private");
	}
}


function initRcv(iInitList){
	//InitList = iInitList;
	var output = "<ul>";
	if(DMStatus){
		for(var i = 0; i < iInitList.length; i++){
			output += "<li>" + iInitList[i].msg; 	
			output += '<button id="DMEditInit' + i + '" onclick="DMEditInit(' + i + ')">Edit</button>';
			output += "</li>"
		}
	}
	else{
		for(var i = 0; i < iInitList.length; i++){
			if(iInitList[i].socket != "Private"){
				output += "<li>" + iInitList[i].msg; 
				output += "</li>"
			}
		}
	}
	output += "</ul>";
	document.getElementById('initList').innerHTML = output;
}

socket.on('InitRcv', function(iInitList){
	initRcv(iInitList);
});

function DMEditInit(num){
	document.getElementById('InitListMenu').style.visibility = "hidden";
	document.getElementById('EditInitListMenu').style.visibility = "visible";
	var output = "Modify " + InitList[num].CName + "'s Init Roll<br>";
	output += 'New Init Value: <input type="text" id="DMNewInitValue" size="1">';
	output += '<button id="DMInitChange" onclick="DMInitChange(' + num + ')">Edit</button><hr>'
	output += '<br><hr>Remove Player From Init List<button id="DMInitRelease" onclick="DMReleaseInit(' + num + ')">Remove</button><hr>'
	output += '<br><hr><button id="DMInitCancle" onclick="DMCancleInit()">Go Back</button><hr>'
	document.getElementById('EditInitListMenu').innerHTML = output;

}
function DMResetInit(){
	socket.emit('ClearInit');
}
function DMReleaseInit(num){
	socket.emit('DMRemoveInit', num);
	DMCancleInit();
}

function DMInitChange(num){
	console.log("hello");
	var initRoll = {
		roll: Number(document.getElementById('DMNewInitValue').value),
		CName: InitList[num].CName,
		msg: InitList[num].CName + ': ' + Number(document.getElementById('DMNewInitValue').value),
		status: 0,
		socket: InitList[num].socket
	}
	socket.emit('DMChangeInit', num, initRoll);
	DMCancleInit();
}



function DMCancleInit(){
	document.getElementById('EditInitListMenu').innerHTML = "";
	document.getElementById('InitListMenu').style.visibility = "visible";
	document.getElementById('EditInitListMenu').style.visibility = "hidden";
}

function clearAdv(){
	document.getElementById('DisadvantageRadio').checked = false;
	document.getElementById('AdvantageRadio').checked = false;
}

socket.on('ChatMsgRcv', function(msg){
	updateChat(msg);
});



socket.on('ReleaseInit', function(){
	if(!DMStatus){
		document.getElementById('initButton').style.visibility = "visible";
	}
});

socket.on('ReleaseInit', function(){
	document.getElementById('initButton').style.visibility = "visible";
});


function updateChat(input){
	ChatMessages.push(input);
	var Output = "";
	for(var i = ChatMessages.length-1; i >= 0; i--){
		Output += ChatMessages[i] + '<hr>';
	}
	document.getElementById('ChatList').innerHTML = Output;
}


function PlayerInitRoll(plus, CharacterName){
	var adv = 0;
	
	if(document.getElementById('RadioAdv').checked){
		adv = 1;
	}else if(document.getElementById('RadioDis').checked){
		adv = -1;
	}
	
	document.getElementById('initButton').style.visibility = "hidden";
	initRoll(plus, CharacterName, adv);
}

function initRoll(plus, CharacterName, adv){
	plus += Number(document.getElementById("initMod").value);
	document.getElementById("initMod").value = "";
	
	
	var dice1 = Math.floor((Math.random() * 20) + 1);
	var dice2 = Math.floor((Math.random() * 20) + 1);
	var dice = diceAdvCalc(adv, dice1, dice2);
	
	var status = 0;
	if(dice == 20){
		status = 1;
	}else if(dice == 1){
		status = -1;
	}
	dice += plus;
	
	socket.emit('InitRoll', CharacterName, dice, status);
}



function diceAdvCalc(adv, dice1, dice2){
	var dice = 0;
	if(adv == 1){	
		if(dice1 >= dice2){
			dice = dice1;
		}
		else{
			dice = dice2;
		}
		return dice;
	}else if(adv == -1){
		if(dice1 <= dice2){
			dice = dice1;
		}
		else{
			dice = dice2;
		}
		return dice;
	}else{
		return dice1;
	}
}



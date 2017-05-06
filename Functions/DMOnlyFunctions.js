function resetDMInitAdv(){
	document.getElementById('InitAdvantageRadio').checked = false;
	document.getElementById('InitDisadvantageRadio').checked = false;
}

socket.on('DMStartingData', function(iMySocketId, iInitList, CharacterStats){
	mySocketId = iMySocketId;
	initRcv(iInitList);
	UpdatePlayerStats(CharacterStats);
});

function initRcv(iInitList){
	InitList = iInitList;
	var output = "<ul>";
	for(var i = 0; i < iInitList.length; i++){
		output += "<li>" + iInitList[i].msg; 
		output += "(" + iInitList[i].plus + ")";
		output += '<button id="DMEditInit' + i + '" onclick="DMEditInit(' + i + ')">Edit</button>';
		output += "</li>"
	}
	output += "</ul>";
	document.getElementById('initList').innerHTML = output;
}



function UpdatePlayerStats(CharacterStats){
	var output = "";
	for(var i = 0; i < CharacterStats.length; i++){
		//console.log("CharacterID: " + CharacterStats[i].socketId);
		//if(CharacterStats[i].socketId == mySocketId){
		//	myIndex = i;
		//}else{
			output += CharacterStats[i].CharacterName + ' - ' + CharacterStats[i].PlayerName + '<br>';
			output += "Level: " + CharacterStats[i].Level + " " + CharacterStats[i].Class + "<br>"
			output += "HP: " + CharacterStats[i].CurrentHP + " / " + CharacterStats[i].MaxHP + "<br>"
			if(CharacterStats[i].CurrentTempHP != 0){
				output += "TempHP: " + CharacterStats[i].CurrentTempHP + " / " + CharacterStats[i].MaxTempHP + "<br>"
			}
			output += "AC: " + (Number(CharacterStats[i].AC) + Number(CharacterStats[i].ACMod)) + "<hr>"
		//}
	}
	document.getElementById('PlayerStats').innerHTML = output;
}

function DMResetInit(){
	console.log("Restting INIT");
	socket.emit('ClearInit');
}

function DMRollInit(){
	var dice;
	var CharacterName = document.getElementById('InitRollName').value;
	document.getElementById('InitRollName').value = "";
	var status = 0;
	var type;
	var plus = Number(document.getElementById('InitRollPlus').value)
	document.getElementById('InitRollPlus').value = "";
	if(document.getElementById('DMDiceInit').checked){
		var adv = 0;
		if(document.getElementById('InitAdvantageRadio').checked){
			adv = 1;
		}else if(document.getElementById('InitDisadvantageRadio').checked){
			adv = -1;
		}
		resetDMInitAdv();
		var dice = diceAdvCalc(adv, Math.floor((Math.random() * 20) + 1), Math.floor((Math.random() * 20) + 1));
		if(dice == 20){
			status = 1;
		}else if(dice == 1){
			status = -1;
		}
	}else if(document.getElementById('DMDSetInit').checked){
		dice = Number(document.getElementById('InitSetValue').value);
		document.getElementById('InitSetValue').value = "";
	}
	if(document.getElementById('PublicRadio').checked){
		socket.emit('DMInitRoll', CharacterName, dice, plus, status, "Public");
	}else if (document.getElementById('PrivateRadio').checked){
		socket.emit('DMInitRoll', CharacterName, dice, plus, status, "Private");
	}
}

function DMEditInit(num){
	document.getElementById('InitListMenu').style.visibility = "hidden";
	document.getElementById('EditInitListMenu').style.visibility = "visible";
	var output = "Modify " + InitList[num].CName + "'s Init Roll<br>";
	output += "Current Value: " + InitList[num].roll;
	output += '<br>New Init Value: <input type="text" id="DMNewInitValue" size="1">';
	output += '<button id="DMInitChange" onclick="DMInitChange(' + num + ')">Edit</button><hr>'
	output += '<br><hr>Remove Character From Init List<button id="DMInitRelease" onclick="DMReleaseInit(' + num + ')">Remove</button><hr>'
	output += '<br><hr><button id="DMInitCancle" onclick="DMCancleInit()">Go Back</button><hr>'
	document.getElementById('EditInitListMenu').innerHTML = output;
}

function DMReleaseInit(num){
	socket.emit('DMRemoveInit', num);
	DMCancleInit();
}

function DMInitChange(num){
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

/*
function clearAdv(){
	document.getElementById('InitDisadvantageRadio').checked = false;
	document.getElementById('InitAdvantageRadio').checked = false;
}

*/


//Until Time to Sort this is all Common functions.

/*

function sendPrivateMessage(toSocket, msg, senderName){
	socket.emit('PrivateMsgSend', toSocket, msg, senderName);
}

*/

socket.on('UpdateAddressBook', function(iAddressBook){
	var select = document.getElementById("PrivateMessageAddress");
	select.innerHTML = "";
	var option;
	
	option = document.createElement('option');
	option.value = mySocketId;
	option.innerHTML = "Self";
	select.appendChild(option);
	
	for(var i = 0; i < iAddressBook.length; i++){
		if(iAddressBook[i].socketId != mySocketId){
			option = document.createElement('option');
			option.value = iAddressBook[i].socketId;
			option.innerHTML = iAddressBook[i].CharacterName + " - " + iAddressBook[i].PlayerName;
			select.appendChild(option);
		}
	}
});



function HideMain(status){
	if(status == 1){
		document.getElementById('MainScreen').style.visibility = 'hidden';
		document.getElementById('PlayerLists').style.visibility = "hidden";
		document.getElementById('ChatList').style.visibility = "hidden";
		document.getElementById('ChatListButtons').style.visibility = 'hidden';
		document.getElementById('ChatList').style.visibility = 'hidden';
	}
	else{
	document.getElementById('MainScreen').style.visibility = 'visible';
		document.getElementById('PlayerLists').style.visibility = "visible";
		document.getElementById('ChatList').style.visibility = "visible";
		document.getElementById('ChatListButtons').style.visibility = 'visible';
		document.getElementById('ChatList').style.visibility = 'visible';
	}
}
function showSpellsScreen(){
	HideMain(1);
	document.getElementById('SpellbookFrame').style.visibility = 'visible';
}
function showMainScreen(){
	HideMain(0);
	document.getElementById('SpellbookFrame').style.visibility = 'hidden';
}



socket.on('UpdatePlayerStats', function(iCharacterStats){
	UpdatePlayerStats(iCharacterStats);
});

socket.on('InitRcv', function(iInitList){
	initRcv(iInitList);
});


function sendMessage(msg){
	
	if(document.getElementById('PrivateRoll').checked == true){
		
		if(sender == self){
			//send to self
		}else{
			//send to that person
			socket.emit('PrivateMsgSend', document.getElementById('PrivateMessageAddress').value, msg);
		}
		
	}else{
		socket.emit('ChatMsgSend', msg);
		
	}
	//socket.emit('PrivateMsgSend', toSocket, msg, senderName);
	//if private == false
	
	
	//if private == true
}
socket.on('ChatMsgRcv', function(msg){
	updateChat(msg);
});

function updateChat(input){
	ChatMessages.push(input);
	var Output = "";
	for(var i = ChatMessages.length-1; i >= 0; i--){
		Output += ChatMessages[i] + '<hr>';
	}
	document.getElementById('ChatList').innerHTML = Output;
}

function ClearAdvDis(){
	document.getElementById('RadioAdv').checked = false;
	document.getElementById('RadioDis').checked = false;
}


function rolld20(plus, skill, name){
	plus = Number(plus);
	var adv;
	if(document.getElementById('RadioAdv').checked){
		adv = 1;
	}
	else if(document.getElementById('RadioDis').checked){
		adv = -1;
	}
	else{
		adv = 0;
	}
	ClearAdvDis();

	var dice = 0;
	var dice1 = Math.floor((Math.random() * 20) + 1);
	var dice2 = Math.floor((Math.random() * 20) + 1);
	var dice = diceAdvCalc(adv, dice1, dice2);
	var mark = "";
	
	if(dice == 20){
		mark = '**';
	}else if(dice == 1){
		mark = '--';
	}
	
	var center; 
	if(adv == 0){ 
		center = name + "(" + skill + '):[' + dice + '] + {' + plus + '} = ' + (dice+plus);
	
	}else if(adv == 1 || adv == -1){
		center = name + "(" + skill + '):[' + dice1 + '][' + dice2 + ']: [' + dice + '] + {' + plus + '} = ' + (dice+plus);
	}
	sendMessage(mark+center+mark);	
}//end rolld20


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


function rollSidedDice(diceNum, diceSides, Plus, name){
	var Output = "";
	var result = 0;
	var temp = 0;
	
	Output += name + "(" + diceNum + 'd' + diceSides + '+' + Plus + '): ';
	for(var i = 1; i <= diceNum; i++){
		temp = Math.floor((Math.random() * diceSides) + 1);
		result += temp;
		Output += "[" + temp + "]";
	}
	Output += " + {" + Plus + "} = " + (result + Plus);
	sendMessage(Output);
}
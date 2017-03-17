function clearChat(){
  ChatMessages = [];
  document.getElementById('ResultListMain').innerHTML = "";
}

	
	
function updatePlayerList(){
	var PlayerListOutput = "";
	var PrivateMsgList = ""
	var id = 0;
	if(DMData.ID != ""){
		PlayerListOutput += DMData.CName +" - " + DMData.PName + '<hr>';
		PrivateMsgList += '<option id="'+ DMData.ID + '">' + DMData.CName + ' - ' + DMData.PName + '</option>';
		id+= 1;
	}
	var i = 0;
	var listLength = LocalPlayerList.length;
	for(i = listLength; i > 0; --i){
		PlayerListOutput += LocalPlayerList[i-1].charName + " - " + LocalPlayerList[i-1].playerName + "<hr>";
		PrivateMsgList += '<option id="' + LocalPlayerList[i-1].playerID + '">' + LocalPlayerList[i-1].charName + ' - ' + LocalPlayerList[i-1].playerName + '</option>';
		id+=1;
	}
	
	
	
	
	//var temp += '<option>' + temp2 +'</option>';
	document.getElementById("privateMsg").innerHTML = PrivateMsgList;
	
	//var height = (34*LocalPlayerList.length)+20;
	//document.getElementById('PlayerList').style.height = String(height) + 'px';
	//document.getElementById('Line3').style.top = String(height) + 'px';
	//document.getElementById('InitListMenu').style.top = String((height +10)) + 'px';
	document.getElementById('PlayerList').innerHTML = PlayerListOutput;
}




function submitPlayerStats(){
	MyCharacter.HPCurrent = document.getElementById('PlayerStatusCurrentHP').value;
	MyCharacter.TempHPCurrent = document.getElementById('PlayerStatusTempHP').value;
	MyCharacter.TempHPMax = document.getElementById('PlayerStatusTempMaxHP').value;
	MyCharacter.ACMod = document.getElementById('PlayerStatusACMod').value;
	socket.emit('UpdatePlayer', MyCharacter);
}

function updatePlayerStatsMenu(){
	var tempOutput = "";
	tempOutput += 'HP: <input type="text" id="PlayerStatusCurrentHP" size="1" value="' + MyCharacter.HPCurrent + '"> / ' + MyCharacter.HPMax + ' <br>';
	tempOutput += 'Temp HP: <input type="text" id="PlayerStatusTempHP" size="1" value="' + MyCharacter.TempHPCurrent + '"> / <input type="text" id="PlayerStatusTempMaxHP" size="1" value="' + MyCharacter.TempHPMax + '"> <br>';
	tempOutput += 'Current AC: ' + MyCharacter.BaseAC + ' + <input type="text" id="PlayerStatusACMod" size="1" value="' + MyCharacter.ACMod + '"><br>';
	tempOutput += '<button id="SubmitStatUpdate" onclick="submitPlayerStats()">Submit</button><hr>';
	document.getElementById('PlayerStats').innerHTML = tempOutput;
	
}














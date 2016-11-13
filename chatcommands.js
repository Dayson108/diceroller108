function clearChat(){
  LocalResultList = []
  document.getElementById('ResultListMain').innerHTML = "";
}

function updateResultList(newInput){
	/*
	*Status Codes
	* 0 - Nothing Special
	* 1 - 20 Roll
	* 5 - Private Normal Roll Recieved 
	* 6 - Private Normal Roll Sent
	*/
	
	//old
	/*Status Codes:
	* -1  Nat 1
	* 0 Dice Roll Result
	* 1 Nat 20
	* 5 - Private Message RecievedDice Roll
	* 6 - Private Message Sent
	*/
	LocalResultList.push(newInput);
	var tempOutput = "";
	var i = 0;
	var listLength = LocalResultList.length;
	tempOutput = "<ul>";
	for(i = listLength; i > 0; --i){
		tempOutput += "<li>";


		if(LocalResultList[i-1].status == 1){
			if(LocalResultList[i-1].natStatus == 1){
				tempOutput += "**"
				tempOutput += LocalResultList[i - 1].name;
			}
			else if(LocalResultList[i-1].natStatus == -1){
				//Nat 1
				tempOutput += "--"
				tempOutput += LocalResultList[i - 1].name;
			}else if(LocalResultList[i-1].natStatus == 0){
				tempOutput += LocalResultList[i - 1].name;
			}
		}
		else if(LocalResultList[i-1].status == 5){
			//PrivateMessageRecieved
			if(LocalResultList[i-1].natStatus == 1){
				tempOutput += "**"
			}
			else if(LocalResultList[i-1].natStatus == -1){
				tempOutput += "--"			
			}
			tempOutput += "Private Roll from " + LocalResultList[i-1].msgFrom;
		}
		else if(LocalResultList[i-1].status == 6){
			//PrivateMessageSent
			if(LocalResultList[i-1].natStatus == 1){
				tempOutput += "**"
			}
			else if(LocalResultList[i-1].natStatus == -1){
				tempOutput += "--"			
			}
			tempOutput += "Private Roll to " + LocalResultList[i-1].msgToName;
		}
		else{
			tempOutput += LocalResultList[i - 1].name;
		}

		
		if(LocalResultList[i-1].skillName != ""){
			tempOutput += "(" + LocalResultList[i-1].skillName + ") ";
		}
		tempOutput += ": " + LocalResultList[i - 1].result;

		
		
		if(LocalResultList[i-1].status == 1 || LocalResultList[i-1].status == 5 || LocalResultList[i-1].status == 6){
			if(LocalResultList[i-1].natStatus == 1){
			  tempOutput += "**"
			}
			else if(LocalResultList[i-1].natStatus == -1)
			{
			  tempOutput += "--"
			}
		}
		
		
		tempOutput += "</li><hr>";
	}
	tempOutput += "</ul>";
	document.getElementById('ResultListMain').innerHTML = tempOutput;
}

function sendPrivateMessage(output)	{
	msgToName = document.getElementById("privateMsg").value;
	var listLength = privateMsgTable.length;
	
	for(i = 0; i < listLength; i++){
		if(privateMsgTable[i].name == msgToName){
			output.msgToId = privateMsgTable[i].id;
			output.msgToName = privateMsgTable[i].fromName;
		}
	}
	output.msgFrom = MyCharacter.CName;
	socket.emit('SendPvtMsg', output);
}
	
	
function updatePlayerList(){
	var tempOutput = "";
	if(GMData.ID != ""){
		tempOutput += GMData.CName;
		tempOutput += " - " + GMData.PName;
		tempOutput += "<hr>";
	}
	var i = 0;
	var listLength = LocalPlayerList.length;
	for(i = listLength; i > 0; --i){
		tempOutput += LocalPlayerList[i-1].charName;
		tempOutput += " - " + LocalPlayerList[i-1].playerName;
		tempOutput += "<hr>";
	}
	//var height = (34*LocalPlayerList.length)+20;
	//document.getElementById('PlayerList').style.height = String(height) + 'px';
	//document.getElementById('Line3').style.top = String(height) + 'px';
	//document.getElementById('InitListMenu').style.top = String((height +10)) + 'px';
	document.getElementById('PlayerList').innerHTML = tempOutput;
}

function updatePrivateMsgList(){
	msgList = document.getElementById("privateMsg");
	var temp = "";
	var i = 0;
	var temp2;
	var privateLink;
	
	var listLength = LocalPlayerList.length;
	privateMsgTable = [];
	
	if(GMData.ID != "" && GMData.ID != MyCharacter.playerID){
		temp2 = GMData.CName + ' - ' + GMData.PName;
		temp += '<option>' + temp2 + '</option>';
		privateLink = {
			name: temp2,
			id: GMData.ID,
			fromName: GMData.CName
		}
		privateMsgTable.push(privateLink);
	}
	
	
	for(i = listLength; i > 0; --i){
		if(LocalPlayerList[i-1].playerID != MyCharacter.playerID){
			temp2 = LocalPlayerList[i-1].charName + ' - ' + LocalPlayerList[i-1].playerName;
			temp += '<option>' + temp2 +'</option>';
			privateLink = {
				name: temp2,
				id: LocalPlayerList[i-1].playerID,
				fromName: LocalPlayerList[i-1].charName
			}
			privateMsgTable.push(privateLink);
		}
	}
	msgList.innerHTML = temp;

}
















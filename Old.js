//from ChatCommands.js
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
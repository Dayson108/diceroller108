

function ClearAdvDis(){
		document.getElementById('RadioAdv').checked = false;
		document.getElementById('RadioDis').checked = false;
		document.getElementById('RadioAdvGM').checked = false;
		document.getElementById('RadioDisGM').checked = false;
}

function GMAdvCheck(){
	if(document.getElementById('RadioAdvGM').checked){
		ClearAdvDis();
		return 1;
	}
	else if(document.getElementById('RadioDisGM').checked){
		ClearAdvDis();
		return -1;
	}
	else{
		return 0;
	}
}

function mainAdvCheck(){
	//RadioAdvGM
	//RadioDisGM
	if(document.getElementById('RadioAdv').checked){
		ClearAdvDis();
		return 1;
	}
	else if(document.getElementById('RadioDis').checked){
		ClearAdvDis();
		return -1;
	}
	else{
		return 0;
	}
}

function rollSkill(Plus, skillName){
	var adv = mainAdvCheck();
	Plus = Plus + Number(document.getElementById('rollMod').value);
	document.getElementById('rollMod').value = "";
	rolld20Dice(Number(Plus), adv, skillName);
}

function rollStat(Plus, skillName, statProf){
	var adv = mainAdvCheck();
	if(statProf){
		Plus = Plus + MyCharacter.ProfBonus;
		
	}
	Plus = Plus + Number(document.getElementById('rollMod').value);
	document.getElementById('rollMod').value = "";
	rolld20Dice(Number(Plus), adv, skillName);
}

function rollADd20Orig(){
	var adv;
	if(document.getElementById('RadioAdv2').checked == true){
		adv = 1;
	}
	else if(document.getElementById('RadioDis2').checked == true){
		adv = -1;
	}
	else{
		adv = 0;
	}
	rolld20Dice(Number(document.getElementById('ADd20POrig').value), adv, 'd20');
	
}

function rolld20Dice(Plus, adv, skillNameTemp){
	var dice;
	var dice1 = Math.floor((Math.random() * 20) + 1);
	var dice2 = Math.floor((Math.random() * 20) + 1);
	var tempResult;
	var tempStatus = 0;
	var output;  
	if(adv == 1){
		if(dice1 >= dice2){
			dice = dice1;
		}
		else{
			dice = dice2;
		}
		tempResult = "[" + dice1 + "][" + dice2 + "]-->[";
	}else if(adv == -1){
		if(dice1 <= dice2){
			dice = dice1;
		}
		else{
			dice = dice2;
		}
		tempResult = "[" + dice1 + "][" + dice2 + "]-->[";
	}else{
		dice = dice1;
		tempResult = "[";	
	}
	tempResult += dice + "] + {" + Plus + "} = " + (dice + Plus);
	if(dice == 20)
	{
		tempStatus = 1;
	}
	else if(dice == 1){
		tempStatus = -1;
	}
	
	
	
	if(document.getElementById("PrivateRoll").checked == true){
		output = {result: tempResult, name: "Private Roll", status: 1, natStatus: tempStatus, skillName: skillNameTemp};
		updateResultList(output);
	}
	else if(document.getElementById("PrivateMessage").checked == true){
		output = {result: tempResult, name: MyCharacter.CName, status: 5, skillName: skillNameTemp, msgToId: "", msgToName: "", msgFrom: "", natStatus: tempStatus}; 
		sendPrivateMessage(output);
		output.status = 6;
		updateResultList(output);
	}else{
    output = {result: tempResult, name: MyCharacter.CName, status:1, natStatus: tempStatus, skillName: skillNameTemp}; 
    updateResultList(output);
    socket.emit('20DiceRoll', output);
	}
	
	
	
}

function rollSidedDice(sides, plus, diceNum, skillNameTemp){
  var dice = 0;
  var i = 0;
  var tempResult = "";
  var tempNum;
  if(diceNum > 0){
    diceNum -= 1;
  }
  for(i = 0; i < diceNum; ++i){
    tempNum = Math.floor((Math.random() * sides) + 1);
    tempResult += "[" + tempNum + "] + ";
    dice += tempNum;
  }
  tempNum = Math.floor((Math.random() * sides) + 1);
  tempResult += "[" + tempNum + "]";
  dice += tempNum;
  tempResult += " + {" + plus + "} = " + (dice + plus);
  
  var output; 

  
	if(document.getElementById("PrivateRoll").checked == true){
		output = {result: tempResult, name: "Private Roll", status: 0, skillName: skillNameTemp};
		updateResultList(output);
	}
	else if(document.getElementById("PrivateMessage").checked == true){
		output = {result: tempResult, name: MyCharacter.CName, status: 5, skillName: skillNameTemp, msgToId: "", msgToName: "", msgFrom: ""}; 
		sendPrivateMessage(output);
		output.status = 6;
		updateResultList(output);
	}else{
		output = {result: tempResult, name: MyCharacter.CName, status: 0, skillName: skillNameTemp}; 
		updateResultList(output);
		socket.emit('sidedDiceRoll', output);
	}
}//rollSidedDice





function ClearAdvDis(){
		document.getElementById('RadioAdv').checked = false;
		document.getElementById('RadioDis').checked = false;
}

function mainAdvCheck(){
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
	var tempStatus;
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
  var output;  
  
  if(document.getElementById("PrivateRoll").checked == false){
    output = {result: tempResult, name: MyCharacter.CName, status: tempStatus, skillName: skillNameTemp}; 
    updateResultList(output);
    socket.emit('20DiceRoll', output);
  }
  else{
  output = {result: tempResult, name: "Private Roll", status: tempStatus, skillName: skillNameTemp};
  updateResultList(output);
  }
	
}

function rollSidedDice(sides, plus, diceNum, skillNameTemp){
	console.log(skillNameTemp);
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
  if(document.getElementById("PrivateRoll").checked == false){
    output = {result: tempResult, name: MyCharacter.CName, status: 0, skillName: skillNameTemp}; 
    updateResultList(output);
    socket.emit('sidedDiceRoll', output);
  }
  else{
  output = {result: tempResult, name: "Private Roll", status: 0, skillName: skillNameTemp};
  updateResultList(output);
  }
}//rollSidedDice






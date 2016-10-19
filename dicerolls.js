function rolldAD20(){
	rolld20Dice(Number(document.getElementById("d20P").value),1);
}
function rolld20(){
	rolld20Dice(Number(document.getElementById("d20P").value),0);
}
function rolld12(){
	rollSidedDice(12, Number(document.getElementById("d12P").value), Number(document.getElementById("d12").value));
}
function rolld10(){
	rollSidedDice(10, Number(document.getElementById("d10P").value), Number(document.getElementById("d10").value));
}
function rolld8(){
	rollSidedDice(8, Number(document.getElementById("d8P").value), Number(document.getElementById("d8").value));
}
function rolld6(){
	rollSidedDice(6, Number(document.getElementById("d6P").value), Number(document.getElementById("d6").value));
}
function rolld4(){
	rollSidedDice(4, Number(document.getElementById("d4P").value), Number(document.getElementById("d4").value));
}

function rolld20Dice(plus, advantage){
	var dice1 = Math.floor((Math.random() * 20) + 1);
	var plus = 0;
	var dice = 0;
	var tempStatus = 0;
	var tempResult;
	if(advantage == 1){
		var dice2 = Math.floor((Math.random() * 20) + 1);
		plus = Number(document.getElementById("ADd20P").value); 
		if(document.getElementById('RadioAdv').checked){
			if(dice1 >= dice2){
				dice = dice1;
			}
			else{
				dice = dice2;
			}
		}
		else if(document.getElementById('RadioDis').checked){
			if(dice1 <= dice2){
				dice = dice1;
			}
			else{
				dice = dice2;
			}
		}
		tempResult = "[" + dice1 + "][" + dice2 + "]-->[" + dice + "] + {" + plus + "} = " + (dice + plus);	
	}
	else{
		plus = Number(document.getElementById("d20P").value);
		dice = dice1;	
		tempResult = "[" + dice + "] + {" + plus + "} = " + (dice +plus);	
	}

	var tempName = document.getElementById("UserName").value;
	if(dice == 20)
	{
		tempStatus = 1;
	}
	else if(dice == 1){
		tempStatus = -1;
	}
	if(tempName == ""){
		tempName = "Unnamed";
	}  
  var output;  
  if(document.getElementById("PrivateRoll").checked == false){
    output = {result: tempResult, name: tempName, status: tempStatus}; 
    updateResultList(output);
    //gapi.hangout.data.sendMessage(JSON.stringify(output));
    socket.emit('20DiceRoll', output);
  }
  else{
  output = {result: tempResult, name: "Private Roll", status: tempStatus};
  updateResultList(output);
  }
}//rolld20Dice

function rollSidedDice(sides, plus, diceNum){
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
  var tempName = document.getElementById("UserName").value;
  if(tempName == ""){
    tempName = "Unnamed";
  }
  var output;  
  if(document.getElementById("PrivateRoll").checked == false){
    output = {result: tempResult, name: tempName, status: 0}; 
    updateResultList(output);
    //gapi.hangout.data.sendMessage(JSON.stringify(output));
    socket.emit('sidedDiceRoll', output);
  }
  else{
  output = {result: tempResult, name: "Private Roll", status: 0};
  updateResultList(output);
  }
}//rollSidedDice

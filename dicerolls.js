function ClearAdvDis(){
	document.getElementById('RadioAdv').checked = false;
	document.getElementById('RadioDis').checked = false;
	document.getElementById('RadioAdvDM').checked = false;
	document.getElementById('RadioDisDM').checked = false;
}


function rollStatThrow(Plus, Skill, SaveCheck, SaveProf){
	if(document.getElementById(SaveCheck).checked){
		Skill = Skill + " Save";
		if(SaveProf){
			Plus += MyCharacter.ProfBonus;	
		}
	}
	rolld20(Plus, Skill)
	
}


function rollDMDice(sides, plus, diceNum){
console.log('sides: ' + sides);
console.log('plus: ' + plus);
console.log('diceNum: ' + diceNum);

	var tempName = MyCharacter.CName;
	MyCharacter.CName = document.getElementById('DMRollName').value;
	if(MyCharacter.CName == ""){MyCharacter.CName = tempName};
	//var skillNameTemp;
	if(sides == 20){
		rolld20(plus, document.getElementById('DMRollType').value);

	}else{
	
		rollSidedDice(diceNum, sides, plus);
	}
	
	MyCharacter.CName = tempName;
}



function mainAdvCheck(){
	if(document.getElementById('RadioAdv').checked || document.getElementById('RadioAdvDM').checked){
		ClearAdvDis();console.log('adv!!');
		return 1;
	}
	else if(document.getElementById('RadioDis').checked || document.getElementById('RadioDisDM').checked){
		ClearAdvDis();
		return -1;
	}
	else{
		return 0;
	}
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

function rolld20(Plus, skill){
	Plus = Plus + Number(document.getElementById('rollMod').value);
	document.getElementById('rollMod').value = "";
	var adv = mainAdvCheck();
	var dice = 0;
	var dice1 = Math.floor((Math.random() * 20) + 1);
	var dice2 = Math.floor((Math.random() * 20) + 1);
	var dice = diceAdvCalc(adv, dice1, dice2);
	console.log('dice: ' + dice);
	var mark = "";
	
	if(dice == 20){
		mark = '**';
	}else if(dice == 1){
		mark = '--';
	}
	
	var center; 
	if(adv == 0){
		center = MyCharacter.CName + "(" + skill + '):[' + dice + '] + {' + Plus + '} = ' + (dice+Plus);
	
	}else if(adv == 1 || adv == -1){
		center = MyCharacter.CName + "(" + skill + '):[' + dice1 + '][' + dice2 + ']: [' + dice + '] + {' + Plus + '} = ' + (dice+Plus);
	}
	
	sendMessage(mark+center+mark);
	
}//end rolld20

function rollSidedDice(diceNum, diceSides, Plus){
	var Output = "";
	var result = 0;
	var temp = 0;
	
	Output += MyCharacter.CName + "(" + diceNum + 'd' + diceSides + '+' + Plus + '): ';
	for(var i = 1; i <= diceNum; i++){
		temp = Math.floor((Math.random() * diceSides) + 1);
		result += temp;
		Output += "[" + temp + "]";
	}
	Output += " + {" + Plus + "} = " + (result + Plus);
	
	sendMessage(Output);
	
}



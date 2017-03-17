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
		//center = Character.CharacterName + "(" + skill + '):[' + dice + '] + {' + plus + '} = ' + (dice+plus);
		center = name + "(" + skill + '):[' + dice + '] + {' + plus + '} = ' + (dice+plus);
	
	}else if(adv == 1 || adv == -1){
		center = name + "(" + skill + '):[' + dice1 + '][' + dice2 + ']: [' + dice + '] + {' + plus + '} = ' + (dice+plus);
		//center = Character.CharacterName + "(" + skill + '):[' + dice1 + '][' + dice2 + ']: [' + dice + '] + {' + plus + '} = ' + (dice+plus);
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



function macro(Macro, name, hideDice){
	var input = parseMacro(document.getElementById(Macro).value, hideDice);
	input = name + ":<br>" + input; 
	sendMessage(input);
}

function parseMacro(input, hideDice){
	var endMark;
	var startMark = input.indexOf("[");
	var endRolls = "";
	
	while(startMark >= 0){
		endMark = input.indexOf("]");
		if(endMark>0){			
			var valid = true;
			var macro = input.substring((1+startMark), endMark);
			var dIndex = macro.indexOf("d");
			var ModIndex = macro.indexOf("+");
			if(dIndex < 0){
				valid = false;
			}
			if(ModIndex < 0){
				ModIndex = macro.indexOf("-")
			}
			if(ModIndex < 0){
				valid = false;
			}
			var tempStart = input.substring(0, startMark);
			var tempEnd = input.substring(1+endMark);
			if(valid){
				var macroRollResult = macroRoll(macro, dIndex, ModIndex);
				var tempMid = macroRollResult[0];
				endRolls += macroRollResult[1];
			}else{
				var tempMid = macro;
			}
			input = tempStart + tempMid + tempEnd;
			startMark = input.indexOf("[");
		}
		else{
			startMark = 0;
		}
	}
	if(hideDice){
		return input;
	}else{
		return input + '<br>' + endRolls;
	}
}

function macroRoll(macro, dIndex, ModIndex){
	var valid = true; 
	
	var diceNum = Number(macro.substring(0, dIndex));
	var diceSides = Number(macro.substring(1+dIndex, ModIndex));
	var plus = Number(macro.substring(1+ModIndex));

	if(Number.isInteger(diceNum) && Number.isInteger(diceSides) && Number.isInteger(plus)){
		var dice = 0;
		var result = 0;;
		var roll = "(" + String(diceNum) + 'd' + String(diceSides) + '+' + String(plus) + ':';
		for(var i = 0; i < diceNum; i++){
			dice = Math.floor((Math.random() * diceSides) + 1);
			roll += String(dice) + ',';
			result += dice;
		}
		result += plus;
		
		roll = roll.substring(0, roll.length-1);
		roll += ')'
		return [result, roll];
	}else{
		return 'invalid macro';
	}	
}



function calcStatBonus(stat){
	stat = Number(stat);
	return ((((stat - 10)) - (stat % 2)) / 2);
}	


function rollStatThrow(plus, Skill, SaveProf, name){
	if(SaveProf == "true"){
		plus += Number(Character.ProfBonus);	
	}
	
	plus += Number(document.getElementById('rollMod').value);
	document.getElementById('rollMod').value = "";
	rolld20(plus, Skill, name);
	
}



function rollSkillThrow(skillProf, stat, Skill, name){
	var plus = 0;
	if(skillProf == "true"){
		plus += Number(Character.ProfBonus);
	}
	plus += calcStatBonus(stat);
	
	plus += Number(document.getElementById('rollMod').value);
	document.getElementById('rollMod').value = "";
	
	rolld20(plus, Skill, name);
}


















//Macro1:<br>
//Character Name: <input type="text" id="DM1Name" style="width:100px;" value="Soren">
//<input type="text" id="DM1" style="width:250px;" value="Attack or something: [3d12+8]"><button id="DM1B" onclick="DMmacro('DM1', 'DM1Name')">Send</button><hr>
function DMmacro(Macro,name){
	var input = parseMacro(document.getElementById(Macro).value);
	var header = document.getElementById(name).value + ':'
	input = header + '<br>' +  input;
	sendMessage(input);
}

function macro(Macro){
	var input = parseMacro(document.getElementById(Macro).value);
	input = MyCharacter.CName + ":<br>" + input; 
	sendMessage(input);
}

function parseMacro(input, header){
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
	
	if(document.getElementById('DMMacroSuppressDice').checked != true){
			input += '<br>' + endRolls;
	}
	
	return input;
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

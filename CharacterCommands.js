var MyCharacter = {
	CName: '',
	PName: '',
	Class: '',
	playerID: '',
	CharacterLevel: 0,
	ProfBonus: 0,
	BaseAC: 0,
	ACMod: 0,
	HPMax: 0,
	HPCurrent: 0,
	TempHPMax: 0,
	TempHPCurrent: 0,
	STR: 0,
	DEX: 0,
	CON: 0,
	INT: 0,
	WIS: 0,
	CHA: 0,
	profSaveSTR: false,
	profSaveDEX: false,
	profSaveCON: false,
	profSaveINT: false,
	profSaveWIS: false,
	profSaveCHA: false,
	profAcrobatics: false,
	profAnimalHandling: false,
	profArcana: false,
	profAthletics: false,
	profDeception: false,
	profHistory: false,
	profInsight: false,
	profIntimidation: false,
	profInvestigation: false,
	profMedicine: false,
	profNature: false,
	profPerception: false,
	profPerformance: false,
	profPersuasion: false,
	profReligion: false,
	profSleightOfHand: false,
	profStealth: false,
	profSurvival: false,
	Acrobatics: function(){
		if(this.profAcrobatics){
			return (this.ProfBonus + this.DEXP());
		}
		return(this.DEXP());
	},
	AnimalHandling: function(){
		if(this.profAnimalHandling){
			return (this.ProfBonus + this.WISP());
		}
		return(this.WISP());
	},
	Arcana: function(){
		if(this.profArcana){
			return (this.ProfBonus + this.INTP());
		}
		return(this.INTP());
	},
	Athletics: function(){
		if(this.profAthletics){
			return (this.ProfBonus + this.STRP());
		}
		return(this.STRP());
	},
	Deception: function(){
		if(this.profDeception){
			return (this.ProfBonus + this.CHAP());
		}
		return(this.CHAP());
	},
	History: function(){
		if(this.profHistory){
			return (this.ProfBonus + this.INTP());
		}
		return(this.INTP());
	},
	Insight: function(){
		if(this.profInsight){
			return (this.ProfBonus + this.WISP());
		}
		return(this.WISP());
	},
	Intimidation: function(){
		if(this.profIntimidation){
			return (this.ProfBonus + this.CHAP());
		}
		return(this.CHAP());
	},
	Investigation: function(){
		if(this.profInvestigation){
			return (this.ProfBonus + this.INTP());
		}
		return(this.INTP());
	},
	Medicine: function(){
		if(this.profMedicine){
			return (this.ProfBonus + this.WISP());
		}
		return(this.WISP());
	},
	Nature: function(){
		if(this.profNature){
			return (this.ProfBonus + this.INTP());
		}
		return(this.INTP());
	},
	Perception: function(){
		if(this.profPerception){
			return (this.ProfBonus + this.WISP());
		}
		return(this.WISP());
	},
	Performance: function(){
		if(this.profPerformance){
			return (this.ProfBonus + this.CHAP());
		}
		return(this.CHAP());
	},
	Persuasion: function(){
		if(this.profPersuasion){
			return (this.ProfBonus + this.CHAP());
		}
		return(this.CHAP());
	},
	Religion: function(){
		if(this.profSleightOfHand){
			return (this.ProfBonus + this.INTP());
		}
		return(this.INTP());
	},
	SleightOfHand: function(){
		if(this.profSleightOfHand){
			return (this.ProfBonus + this.DEXP());
		}
		return(this.DEXP());
	},
	Stealth: function(){
		if(this.profStealth){
			return (this.ProfBonus + this.DEXP());
		}
		return(this.DEXP());
	},
	Survival: function(){
		if(this.profSurvival){
			return (this.ProfBonus + this.WISP());
		}
		return(this.WISP());
	},
	STRP: function(){
		return(calcStatBonus(this.STR));
	},
	DEXP: function(){
		return(calcStatBonus(this.DEX));
	},
	CONP: function(){
		return(calcStatBonus(this.CON));
	},
	INTP: function(){
		return(calcStatBonus(this.INT));
	},
	WISP: function(){
		return(calcStatBonus(this.WIS));
	},
	CHAP: function(){
		return(calcStatBonus(this.CHA));
	}
};

function calcStatBonus(stat){
	return ((((stat - 10)) - (stat % 2)) / 2);
}

function resetStats(){
	document.getElementById('CharacterSheetButton').style.visibility = 'visible';
	document.getElementById('CharacterStatsButton').style.visibility = 'hidden';
	document.getElementById('MainScreenButton').style.visibility = 'hidden';
	showScreen('CharacterSheet');
}

function SubmitCharacterStats(){
	MyCharacter.CName = document.getElementById('CharacterName').value;
	MyCharacter.CharacterLevel = Number(document.getElementById('MyLevel').value);
	MyCharacter.ProfBonus = Math.ceil(1+(MyCharacter.CharacterLevel / 4));
	MyCharacter.Class = document.getElementById('CharCreateClass').value;
	MyCharacter.BaseAC = Number(document.getElementById('MyBaseAC').value);
	MyCharacter.HPMax = Number(document.getElementById('MyHPMax').value);
	MyCharacter.HPCurrent = MyCharacter.HPMax;
	MyCharacter.TempHPMax = 0;
	MyCharacter.TempHPCurrent = 0;
	MyCharacter.ACMod = 0;
	MyCharacter.profSaveSTR = document.getElementById("STRProfCheck").checked;
	MyCharacter.profSaveDEX = document.getElementById("DEXProfCheck").checked;
	MyCharacter.profSaveCON = document.getElementById("CONProfCheck").checked;
	MyCharacter.profSaveINT = document.getElementById("INTProfCheck").checked;
	MyCharacter.profSaveWIS = document.getElementById("WISProfCheck").checked;
	MyCharacter.profSaveCHA = document.getElementById("CHAProfCheck").checked;
	MyCharacter.STR = Number(document.getElementById('MySTR').value);
	MyCharacter.DEX = Number(document.getElementById('MyDEX').value);
	MyCharacter.CON = Number(document.getElementById('MyCON').value);
	MyCharacter.INT = Number(document.getElementById('MyINT').value);
	MyCharacter.WIS = Number(document.getElementById('MyWIS').value);
	MyCharacter.CHA = Number(document.getElementById('MyCHA').value);
	MyCharacter.profAcrobatics = document.getElementById("AcrobaticsProfCheck").checked;
	MyCharacter.profAnimalHandling = document.getElementById("AnimalHandlingProfCheck").checked;
	MyCharacter.profArcana = document.getElementById("ArcanaProfCheck").checked;
	MyCharacter.profAthletics = document.getElementById("AthleticsProfCheck").checked;
	MyCharacter.profDeception = document.getElementById("DeceptionProfCheck").checked;
	MyCharacter.profHistory = document.getElementById("HistoryProfCheck").checked;
	MyCharacter.profInsight = document.getElementById("InsightProfCheck").checked;
	MyCharacter.profIntimidation = document.getElementById("IntimidationProfCheck").checked;
	MyCharacter.profInvestigation = document.getElementById("InvestigationProfCheck").checked;
	MyCharacter.profMedicine = document.getElementById("MedicineProfCheck").checked;
	MyCharacter.profNature = document.getElementById("NatureProfCheck").checked;
	MyCharacter.profPerception = document.getElementById("PerceptionProfCheck").checked;
	MyCharacter.profPerformance = document.getElementById("PerformanceProfCheck").checked;
	MyCharacter.profPersuasion = document.getElementById("PersuasionProfCheck").checked;
	MyCharacter.profReligion = document.getElementById("ReligionProfCheck").checked;
	MyCharacter.profSleightOfHand = document.getElementById("SleightOfHandProfCheck").checked;
	MyCharacter.profStealth = document.getElementById("StealthProfCheck").checked;
	MyCharacter.profSurvival = document.getElementById("SurvivalProfCheck").checked;
	
	document.getElementById('CharacterStatsButton').style.visibility = 'visible';
	document.getElementById('CharacterSheetButton').style.visibility = 'hidden';
	document.getElementById('MainScreenButton').style.visibility = 'visible';
	//document.getElementById('initbutton').style.visibility = 'visible';
	
	document.getElementById("initstats").innerHTML = '<br><button id="initbutton" onclick="rollInit()">Roll Init</button>' + "1d20 + " + MyCharacter.DEXP() + '    Modifier: <input type="text" id="intMod" style="width: 30px">';
	skillButtonNameChange();
	UpdateStats();
	updatePlayerStatsMenu();
	//showPlayerScreens();
	showMainScreen('PlayerMain');
	submitChar();
	socket.emit('AddPlayer', MyCharacter);
}

function plusMinusString(number){
	if(number >= 0){
		return ('+'+number);
	}else{
		return (number);
	}
}

function skillButtonNameChange(){
	var strP = 0;
	var dexP = 0;
	var conP = 0;
	var intP = 0;
	var wisP = 0;
	var chaP = 0;
	if(MyCharacter.profSTR){
		strP = MyCharacter.ProfBonus;
	}
	if(MyCharacter.profDEX){
		dexP = MyCharacter.ProfBonus;
	}
	if(MyCharacter.profCON){
		conP = MyCharacter.ProfBonus;
	}
	if(MyCharacter.profINT){
		intP = MyCharacter.ProfBonus;
	}
	if(MyCharacter.profWIS){
		wisP = MyCharacter.ProfBonus;
	}
	if(MyCharacter.profCHA){
		chaP = MyCharacter.ProfBonus;
	}
	document.getElementById('STRRoll').innerHTML = 'STR(' + plusMinusString(strP + MyCharacter.STRP()) + ')';
	document.getElementById('DEXRoll').innerHTML = 'DEX(' + plusMinusString(dexP + MyCharacter.DEXP()) + ')';
	document.getElementById('CONRoll').innerHTML = 'CON(' + plusMinusString(conP + MyCharacter.CONP()) + ')';
	document.getElementById('INTRoll').innerHTML = 'INT(' + plusMinusString(intP + MyCharacter.INTP()) + ')';
	document.getElementById('WISRoll').innerHTML = 'WIS(' + plusMinusString(wisP + MyCharacter.WISP()) + ')';
	document.getElementById('CHARoll').innerHTML = 'CHA(' + plusMinusString(chaP + MyCharacter.CHAP()) + ')';
	
	document.getElementById('rollAcrobatics').innerHTML = 'Acrobatics(' + plusMinusString(MyCharacter.Acrobatics()) + ')';
	document.getElementById('rollAnimalHandling').innerHTML = 'Animal Handling(' + plusMinusString(MyCharacter.AnimalHandling()) + ')';
	document.getElementById('rollArcana').innerHTML = 'Arcana(' + plusMinusString(MyCharacter.Arcana()) + ')';
	document.getElementById('rollAthletics').innerHTML = 'Athletics(' + plusMinusString(MyCharacter.Athletics()) + ')';
	document.getElementById('rollDeception').innerHTML = 'Deception(' + plusMinusString(MyCharacter.Deception()) + ')';
	document.getElementById('rollHistory').innerHTML = 'History(' + plusMinusString(MyCharacter.History()) + ')';
	document.getElementById('rollInsight').innerHTML = 'Insight(' + plusMinusString(MyCharacter.Insight()) + ')';
	document.getElementById('rollIntimidation').innerHTML = 'Intimidation(' + plusMinusString(MyCharacter.Intimidation()) + ')';
	document.getElementById('rollInvestigation').innerHTML = 'Investigation(' + plusMinusString(MyCharacter.Investigation()) + ')';
	document.getElementById('rollMedicine').innerHTML = 'Medicine(' + plusMinusString(MyCharacter.Medicine()) + ')';
	document.getElementById('rollNature').innerHTML = 'Nature(' + plusMinusString(MyCharacter.Nature()) + ')';
	document.getElementById('rollPerception').innerHTML = 'Perception(' + plusMinusString(MyCharacter.Perception()) + ')';
	document.getElementById('rollPerformance').innerHTML = 'Performance(' + plusMinusString(MyCharacter.Performance()) + ')';
	document.getElementById('rollPersuasion').innerHTML = 'Persuasion(' + plusMinusString(MyCharacter.Persuasion()) + ')';
	document.getElementById('rollReligion').innerHTML = 'Religion(' + plusMinusString(MyCharacter.Religion()) + ')';
	document.getElementById('rollSleightOfHand').innerHTML = 'SleightOfHand(' + plusMinusString(MyCharacter.SleightOfHand()) + ')';
	document.getElementById('rollStealth').innerHTML = 'Stealth(' + plusMinusString(MyCharacter.Stealth()) + ')';
	document.getElementById('rollSurvival').innerHTML = 'Survival(' + plusMinusString(MyCharacter.Survival()) + ')';
	
	
	
}

function UpdateStats(){
	var tempString = "";
	
	tempString += "Character Name: " + MyCharacter.CName + "<br>";
	tempString += "Player Name: " + MyCharacter.PName + "<hr>";
	tempString += "Character Level: " + MyCharacter.CharacterLevel + "<br>";
	tempString += "Proficency Bonus: " + MyCharacter.ProfBonus + "<hr>";
    tempString += "Strength: " + MyCharacter.STR + "<br>";
	tempString += "Strength Bonus: " + MyCharacter.STRP() + "<br>";
    tempString += "Dexterity: " + MyCharacter.DEX + "<br>";
	tempString += "Dexterity Bonus: " + MyCharacter.DEXP() + "<br>";
    tempString += "Constitution: " + MyCharacter.CON + "<br>";
	tempString += "Constitution Bonus: " + MyCharacter.CONP() + "<br>";
	tempString += "Intelligence: " + MyCharacter.INT + "<br>";
	tempString += "Intelligence Bonus: " + MyCharacter.INTP() + "<br>";
    tempString += "Wisdom: " + MyCharacter.WIS + "<br>";
	tempString += "Wisdom Bonus: " + MyCharacter.WISP() + "<br>";
    tempString += "Charisma: " + MyCharacter.CHA + "<br>";
	tempString += "Charisma Bonus: " + MyCharacter.CHAP() + "<hr>";
	tempString += "Acrobatics Skill: " + MyCharacter.Acrobatics() + "<br>";
	tempString += "Animal Handling Skill: " + MyCharacter.AnimalHandling() + "<br>";
	tempString += "Arcana Skill: " + MyCharacter.Arcana() + "<br>";
	tempString += "Athletics Skill: " + MyCharacter.Athletics() + "<br>";
	tempString += "Deception Skill: " + MyCharacter.Deception() + "<br>";
	tempString += "History Skill: " + MyCharacter.History() + "<br>";
	tempString += "Insight Skill: " + MyCharacter.Insight() + "<br>";
	tempString += "Intimidation Skill: " + MyCharacter.Investigation() + "<br>";
	tempString += "Investigation Skill: " + MyCharacter.Investigation() + "<br>";
	tempString += "Medicine Skill: " + MyCharacter.Medicine() + "<br>";
	tempString += "Nature Skill: " + MyCharacter.Nature() + "<br>";
	tempString += "Perception Skill: " + MyCharacter.Perception() + "<br>";
	tempString += "Performance Skill: " + MyCharacter.Performance() + "<br>";
	tempString += "Persuasion Skill: " + MyCharacter.Persuasion() + "<br>";
	tempString += "Religion Skill: " + MyCharacter.Religion() + "<br>";
	tempString += "Sleight of Hand Skill: " + MyCharacter.SleightOfHand() + "<br>";
	tempString += "Stealth Skill: " + MyCharacter.Stealth() + "<br>";
	tempString += "Survival Skill: " + MyCharacter.Survival() + "<br>";
	
	document.getElementById('CharacterStats').innerHTML = tempString;
}



function loadCharacter(){
	if(document.getElementById('loadCharacterInput').value == "IAMDEV"){
		document.getElementById('DeveloperScreenButton').style.visibility = 'visible'
	}
	
	/*
	MyCharacterInput = JSON.parse(document.getElementById('loadCharacterInput').value);
	MyCharacter.CName = MyCharacterInput.CName;
	MyCharacter.PName = MyCharacterInput.PName;
	MyCharacter.CharacterLevel = MyCharacterInput.CharacterLevel;
	MyCharacter.ProfBonus = MyCharacterInput.ProfBonus;
		
		
		
	MyCharacter.Class = MyCharacterInput.Class;
	MyCharacter.BaseAC = MyCharacterInput.BaseAC
	MyCharacter.HPMax = MyCharacterInput.HPMax;
	MyCharacter.HPCurrent = MyCharacterInput.HPMax;
		
	MyCharacter.TempHPMax = 0;
	MyCharacter.TempHPCurrent = 0;
	MyCharacter.ACMod = 0;
	
	
	
	MyCharacter.STR = MyCharacterInput.STR;
	MyCharacter.DEX = MyCharacterInput.DEX;
	MyCharacter.CON = MyCharacterInput.CON;
	MyCharacter.INT = MyCharacterInput.INT;
	MyCharacter.WIS = MyCharacterInput.WIS;
	MyCharacter.CHA = MyCharacterInput.CHA;
	
	MyCharacter.profSaveSTR = MyCharacterInput.profSaveSTR;
	MyCharacter.profSaveDEX = MyCharacterInput.profSaveDEX;
	MyCharacter.profSaveCON = MyCharacterInput.profSaveCON;
	MyCharacter.profSaveINT = MyCharacterInput.profSaveINT;
	MyCharacter.profSaveWIS = MyCharacterInput.profSaveWIS;
	MyCharacter.profSaveCHA = MyCharacterInput.profSaveCHA;
	MyCharacter.profAcrobatics = MyCharacterInput.profAcrobatics;
	MyCharacter.profAnimalHandling = MyCharacterInput.profAnimalHandling;
	MyCharacter.profArcana = MyCharacterInput.profArcana;
	MyCharacter.profAthletics = MyCharacterInput.profAthletics;
	MyCharacter.profDeception = MyCharacterInput.profDeception;
	MyCharacter.profHistory = MyCharacterInput.profHistory;
	MyCharacter.profInsight = MyCharacterInput.profInsight;
	MyCharacter.profIntimidation = MyCharacterInput.profIntimidation;
	MyCharacter.profInvestigation = MyCharacterInput.profInvestigation;
	MyCharacter.profMedicine = MyCharacterInput.profMedicine;
	MyCharacter.profNature = MyCharacterInput.profNature;
	MyCharacter.profPerception = MyCharacterInput.profPerception;
	MyCharacter.profPerformance = MyCharacterInput.profPerformance;
	MyCharacter.profPersuasion = MyCharacterInput.profPersuasion;
	MyCharacter.profReligion = MyCharacterInput.profReligion;
	MyCharacter.profSleightOfHand = MyCharacterInput.profSleightOfHand;
	MyCharacter.profStealth = MyCharacterInput.profStealth;
	MyCharacter.profSurvival = MyCharacterInput.profSurvival;

	recheckBoxes();
	document.getElementById('MainScreenButton').style.visibility = 'visible';
	document.getElementById('CharacterStatsButton').style.visibility = 'visible';
	document.getElementById('CharacterSheetButton').style.visibility = 'hidden';
	UpdateStats();
	var msg = {
		CName: MyCharacter.CName,
		PName: MyCharacter.PName
	};
	socket.emit('playerSubmitted', msg);
	skillButtonNameChange();
	document.getElementById('NotesScreenButton').style.visibility = 'visible';
	document.getElementById('CommentsScreenButton').style.visibility = 'visible';
	document.getElementById('initbutton').style.visibility = 'visible';
	showScreen('Main');
	*/
}
function recheckBoxes(){
	document.getElementById("MySTR").value = MyCharacter.STR;
	document.getElementById("MyDEX").value = MyCharacter.DEX;
	document.getElementById("MyCON").value = MyCharacter.CON;
	document.getElementById("MyINT").value = MyCharacter.INT;
	document.getElementById("MyWIS").value = MyCharacter.WIS;
	document.getElementById("MyCHA").value = MyCharacter.CHA;
		
	if(MyCharacter.profSTR){document.getElementById("STRProfCheck").checked = true}
	if(MyCharacter.profDEX){document.getElementById("DEXProfCheck").checked = true}
	if(MyCharacter.profCON){document.getElementById("CONProfCheck").checked = true}
	if(MyCharacter.profINT){document.getElementById("INTProfCheck").checked = true}
	if(MyCharacter.profWIS){document.getElementById("WISProfCheck").checked = true}
	if(MyCharacter.profCHA){document.getElementById("CHAProfCheck").checked = true}
	
	
	if(MyCharacter.profAcrobatics){document.getElementById("AcrobaticsProfCheck").checked = true}
	if(MyCharacter.profAnimalHandling){document.getElementById("AnimalHandlingProfCheck").checked = true}
	if(MyCharacter.profArcana){document.getElementById("ArcanaProfCheck").checked = true}
	if(MyCharacter.profAthletics){document.getElementById("AthleticsProfCheck").checked = true}
	if(MyCharacter.profDeception){document.getElementById("DeceptionProfCheck").checked = true}
	if(MyCharacter.profHistory){document.getElementById("HistoryProfCheck").checked = true}
	if(MyCharacter.profInsight){document.getElementById("InsightProfCheck").checked = true}
	if(MyCharacter.profIntimidation){document.getElementById("IntimidationProfCheck").checked = true}
	if(MyCharacter.profInvestigation){document.getElementById("InvestigationProfCheck").checked = true}
	if(MyCharacter.profMedicine){document.getElementById("MedicineProfCheck").checked = true}
	if(MyCharacter.profNature){document.getElementById("NatureProfCheck").checked = true}
	if(MyCharacter.profPerception){document.getElementById("PerceptionProfCheck").checked = true}
	if(MyCharacter.profPerformance){document.getElementById("PerformanceProfCheck").checked = true}
	if(MyCharacter.profPersuasion){document.getElementById("PersuasionProfCheck").checked = true}
	if(MyCharacter.profReligion){document.getElementById("ReligionProfCheck").checked = true}
	if(MyCharacter.profSleightOfHand){document.getElementById("SleightOfHandProfCheck").checked = true}
	if(MyCharacter.profStealth){document.getElementById("StealthProfCheck").checked = true}
	if(MyCharacter.profSurvival){document.getElementById("SurvivalProfCheck").checked = true}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
function saveCharacter(){
	document.getElementById('SaveString').value = JSON.stringify(MyCharacter);
	
	/* This should be some kind of save to file
	var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

var data = { x: 42, s: "hello, world", d: new Date() },
    fileName = "my-download.json";

saveData(data, fileName);

*/
	
}


function submitChar(){
	var msg = {
		CName: MyCharacter.CName,
		PName: MyCharacter.PName
	};
	socket.emit('playerSubmitted', msg);
	
}
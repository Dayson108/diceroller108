function initRcv(iInitList){
	var output = "<ul>";
	for(var i = 0; i < iInitList.length; i++){
		if(iInitList[i].socket != "Private"){
			output += "<li>" + iInitList[i].msg; 
			output += "</li>"
		}
	}
	output += "</ul>";
	document.getElementById('initList').innerHTML = output;
}

socket.on('PlayerStartingData', function(iMySocketId, iInitList){
	mySocketId = iMySocketId;
	initRcv(iInitList);

});


socket.on('ReleaseInit', function(){
	document.getElementById('initButton').style.visibility = "visible";
});





function UpdatePlayerStats(CharacterStats){
	var output = "";
	var myStats = "";
	var myIndex;

	for(var i = 0; i < CharacterStats.length; i++){
		if(CharacterStats[i].socketId == mySocketId){
			myIndex = i;
		}else{
			
			//Update CharacterStats
			output += CharacterStats[i].CharacterName + ' - ' + CharacterStats[i].PlayerName + '<br>';
			output += "Level: " + CharacterStats[i].Level + " " + CharacterStats[i].Class + "<br>"
			output += "HP: " + CharacterStats[i].CurrentHP + " / " + CharacterStats[i].MaxHP + "<br>"
			if(CharacterStats[i].CurrentTempHP != 0){
				output += "TempHP: " + CharacterStats[i].CurrentTempHP + " / " + CharacterStats[i].MaxTempHP + "<br>"
			}
			output += "AC: " + (Number(CharacterStats[i].AC) + Number(CharacterStats[i].ACMod)) + "<hr>"
		}
	}
	myStats += CharacterStats[myIndex].CharacterName + ' - ' + CharacterStats[myIndex].PlayerName + '<br>';
	myStats += "Level: " + CharacterStats[myIndex].Level + " " + CharacterStats[myIndex].Class + "<br>"
	myStats += 'HP: <input type="text" id="myHP" size="1" value="' + CharacterStats[myIndex].CurrentHP + '">/ ' + CharacterStats[myIndex].MaxHP + '<br>';
	myStats += 'Temp HP: <input type="text" id="myTempHP" size="1" value="' + CharacterStats[myIndex].CurrentTempHP + '">/<input type="text" id="myTempMaxHP" size="1" value="' + CharacterStats[myIndex].MaxTempHP + '"><br>'	
	myStats += 'AC: ' + CharacterStats[myIndex].AC + ' + <input type="text" id="myACMod" size="1" value="' + CharacterStats[myIndex].ACMod + '"><br>';
	myStats += '<button id="sumbitStats" onclick="submitNewStats()">Submit</button><hr>';
	document.getElementById('PlayerStats').innerHTML = myStats + output;
}

function submitNewStats(){
	var newStats = {
		CurrentHP: document.getElementById('myHP').value,
		TempHP: document.getElementById('myTempHP').value,
		TempMaxHP: document.getElementById('myTempMaxHP').value,
		ACMod: document.getElementById('myACMod').value
	}
	socket.emit('UpdateServerCharacterStats', newStats);
}


function setSkillButtons(skillName, skillProf, skillStat, buttonID){
	var bonus = 0;
	if(skillName != ""){
		if(skillProf  == "+"){
			bonus += Number(Character.ProfBonus);
		}else if(skillProf == "++"){
			bonus += (Number(Character.ProfBonus) * 2);
		}
		switch(skillStat){
				case "STR":
					bonus += calcStatBonus(Character.STR);
					break;
				case "DEX":
					bonus += calcStatBonus(Character.DEX);
					break;
				case "CON":
					bonus += calcStatBonus(Character.CON);
					break;
				case "INT":
					bonus += calcStatBonus(Character.INT);
					break;
				case "WIS":
					bonus += calcStatBonus(Character.WIS);	
					break;
				case "CHA":
					bonus += calcStatBonus(Character.CHA);
					break;
		}
		if(bonus > 0){
			document.getElementById(buttonID).innerHTML = skillName + "(+" + bonus + ")";
		}else{
			document.getElementById(buttonID).innerHTML = skillName + "(0)";
		}		
	} else{
		document.getElementById(buttonID).style.visibility = "hidden";
	}	
}

function updateSkillButtonNames(){
	setSkillButtons("Strength", Character.STRProf, "STR", "STRRoll");
	setSkillButtons("Dexterity", Character.DEXProf, "DEX", "DEXRoll");
	setSkillButtons("Constitution", Character.CONProf, "CON", "CONRoll");
	setSkillButtons("Intelligence", Character.INTProf, "INT", "INTRoll");
	setSkillButtons("Wisdom", Character.WISProf, "WIS", "WISRoll");
	setSkillButtons("Charisma", Character.CHAProf, "CHA", "CHARoll");

	//STR Skills
	setSkillButtons("Athletics", Character.AthleticsProf, "STR", "AthleticsButton");
	
	//Dex
	setSkillButtons("Acrobatics", Character.AcrobaticsProf, "DEX", "AcrobaticsButton");
	setSkillButtons("Sleight Of Hand", Character.SleightOfHandProf, "DEX", "SleightOfHandButton");
	setSkillButtons("Stealth", Character.StealthProf, "DEX", "StealthButton");
	setSkillButtons("Animal Handling", Character.AnimalHandlingProf, "DEX", "AnimalHandlingButton");

	//Wisdom Skills
	setSkillButtons("Insight", Character.InsightProf, "WIS", "InsightButton");
	setSkillButtons("Medicine", Character.MedicineProf, "WIS", "MedicineButton");
	setSkillButtons("Perception", Character.PerceptionProf, "WIS", "PerceptionButton");
	setSkillButtons("Survival", Character.SurvivalProf, "WIS", "SurvivalButton");

	//Int
	setSkillButtons("Arcana", Character.ArcanaProf, "INT", "ArcanaButton");
	setSkillButtons("History", Character.HistoryProf, "INT", "HistoryButton");
	setSkillButtons("Investigation", Character.InvestigationProf, "INT", "InvestigationButton");
	setSkillButtons("Nature", Character.NatureProf, "INT", "NatureButton");
	setSkillButtons("Religion", Character.ReligionProf, "INT", "ReligionButton");

	//Cha
	setSkillButtons("Deception", Character.DeceptionProf, "CHA", "DeceptionButton");
	setSkillButtons("Intimidation", Character.IntimidationProf, "CHA", "IntimidationButton");
	setSkillButtons("Performance", Character.PerformanceProf, "CHA", "PerformanceButton");
	setSkillButtons("Persuasion", Character.PersuasionProf, "CHA", "PersuasionButton");

	//Custom
	setSkillButtons(Character.CustomSkill1Name, Character.CustomSkill1Prof, Character.CustomSkill1Stat, "CustomSkill1Button");
	setSkillButtons(Character.CustomSkill2Name, Character.CustomSkill2Prof, Character.CustomSkill2Stat, "CustomSkill2Button");
	setSkillButtons(Character.CustomSkill3Name, Character.CustomSkill3Prof, Character.CustomSkill3Stat, "CustomSkill3Button");	
}

function rollCustomSkillThrow(skillProf, skillStat, skillName){
	var statBonus = 0;
	switch(skillStat){
		case "STR":
			statBonus = Character.STR;
			break;
		case "DEX":
			statBonus = Character.DEX;
			break;
		case "CON":
			statBonus = Character.CON;
			break;
		case "INT":
			statBonus = Character.INT;
			break;
		case "WIS":
			statBonus = Character.WIS;	
			break;
		case "CHA":
			statBonus = Character.CHA;
			break;
	}
	rollSkillThrow(skillProf, statBonus, skillName, Character.CharacterName);
}

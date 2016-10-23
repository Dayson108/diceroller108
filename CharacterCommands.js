var MyCharacter = {
		CName: '',
		PName: '',
    	STR: 0,
    	DEX: 0,
    	CON: 0,
		INT: 0,
    	WIS: 0,
    	CHR: 0,
		STRP: 0,
    	DEXP: 0,
    	CONP: 0,
		INTP: 0,
    	WISP: 0,
    	CHRP: 0,
		Acrobatics: 0,
		AnimalHandling: 0,
		Arcana: 0,
		Athletics: 0,
		Deception: 0,
		History: 0,
		Insight: 0,
		Intimidation: 0,
		Investigation: 0,
		Medicine: 0,
		Perception: 0,
		Performance: 0,
		Persuasion: 0,
		Religion: 0,
		SleightOfHand: 0,
		Stealth: 0,
		Survival: 0
};


function calcStatBonus(stat){
	return ((((stat - 10)) - (stat % 2)) / 2);
}

function SubmitCharacterStats(){
	MyCharacter.STR = Number(document.getElementById('MySTR').value);
	MyCharacter.STRP = calcStatBonus(MyCharacter.STR);
	
	MyCharacter.DEX = Number(document.getElementById('MyDEX').value);
	MyCharacter.DEXP = calcStatBonus(MyCharacter.DEX);
	
	MyCharacter.CON = Number(document.getElementById('MyCON').value);
	MyCharacter.CONP = calcStatBonus(MyCharacter.CON);
	
	MyCharacter.INT = Number(document.getElementById('MyINT').value);
	MyCharacter.INTP = calcStatBonus(MyCharacter.INT);
	
	MyCharacter.WIS = Number(document.getElementById('MyWIS').value);
	MyCharacter.WISP = calcStatBonus(MyCharacter.WIS);
	
	MyCharacter.CHR = Number(document.getElementById('MyCHR').value);
	MyCharacter.CHRP = calcStatBonus(MyCharacter.CHR);
	
	
	
	MyCharacter.Acrobatics = Number(document.getElementById('MyAcrobatics').value);
	MyCharacter.AnimalHandling = Number(document.getElementById('MyAnimalHandling').value);
	MyCharacter.Arcana = Number(document.getElementById('MyArcana').value);
	MyCharacter.Athletics = Number(document.getElementById('MyAthletics').value);
	MyCharacter.Deception = Number(document.getElementById('MyDeception').value);
	MyCharacter.History = Number(document.getElementById('MyHistory').value);
	MyCharacter.Insight = Number(document.getElementById('MyInsight').value);
	MyCharacter.Intimidation = Number(document.getElementById('MyIntimidation').value);
	MyCharacter.Investigation = Number(document.getElementById('MyInvestigation').value);
	MyCharacter.Medicine = Number(document.getElementById('MyMedicine').value);
	MyCharacter.Perception = Number(document.getElementById('MyPerception').value);
	MyCharacter.Performance = Number(document.getElementById('MyPerformance').value);
	MyCharacter.Persuasion = Number(document.getElementById('MyPersuasion').value);
	MyCharacter.Religion = Number(document.getElementById('MyReligion').value);
	MyCharacter.SleightOfHand = Number(document.getElementById('MySleightOfHand').value);
	MyCharacter.Stealth = Number(document.getElementById('MyStealth').value);
	MyCharacter.Survival = Number(document.getElementById('MySurvival').value);
	
	//document.getElementById('CharacterStatsButton').style.visibility = 'visible';
	//document.getElementById('CharacterSheetButton').style.visibility = 'hidden';
	document.getElementById('MainScreenButton').style.visibility = 'visible';
	
	showScreen('DiceMain');
	
}
	
function showSpell(iSpell){
	var tempOutput;
	
	tempOutput = "<h1>" + iSpell.Name;
	if(iSpell.Ritual){tempOutput += " (R)";}
	if(iSpell.Concentration){tempOutput += "(C)";}
	if(iSpell.HigherLevels){tempOutput += "(+)";}
	tempOutput += "</h1>";
	
	tempOutput += "<b>";
	if(iSpell.Level != 0){
		tempOutput += "Level " + iSpell.Level + " " + iSpell.School + " spell<br>";
	}else{
		tempOutput += iSpell.School + " Cantrip<br>";
	}
	tempOutput += "</b>";
	
	tempOutput += "<b>Castable by: </b>";
	if(iSpell.Bard){tempOutput += "Bard ";}
	if(iSpell.Cleric){tempOutput += "Cleric ";}
	if(iSpell.Druid){tempOutput += "Druid ";}
	if(iSpell.Paladin){tempOutput += "Paladin ";}
	if(iSpell.Ranger){tempOutput += "Ranger ";}
	if(iSpell.Sorcerer){tempOutput += "Sorcerer ";}
	if(iSpell.Warlock){tempOutput += "Warlock ";}
	if(iSpell.Wizard){tempOutput += "Wizard ";}
	tempOutput += "<br>";
	
	tempOutput += "<b>Components: </b>" + iSpell.Components + "<br>";
	tempOutput += "<b>Casting Time: </b>" + iSpell.CastingTime + "<br>";
	tempOutput += "<b>Range: </b>" + iSpell.Range + "<br>";
	tempOutput += "<b>Duration: </b>" + iSpell.Duration + "<br>";
	tempOutput += "<b>Source: </b>" + iSpell.Source + "<hr>";
	
	if(iSpell.HigherLevels){
		tempOutput += "<b>At Higher Levels</b><br>" + iSpell.HigherLevelsText + "<hr>";
	}
	
	
	for(var i = 0; i < iSpell.Description.length; i++){
		tempOutput += "<p>" + iSpell.Description[i] + "</p>";
	}
	
	document.getElementById('SpellbookPage').innerHTML = tempOutput;
}

function showBardSpells(){
	
	var tempOutput = '<h1>Bard</h1><hr>';
	
	tempOutput += '<h2>Cantrips</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Bard == true && Spell[i].Level == 0){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 1</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Bard == true && Spell[i].Level == 1){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 2</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Bard == true && Spell[i].Level == 2){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 3</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Bard == true && Spell[i].Level == 3){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 4</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Bard == true && Spell[i].Level == 4){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 5</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Bard == true && Spell[i].Level == 5){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 6</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Bard == true && Spell[i].Level == 6){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';	
	
	tempOutput += '<h2>Level 7</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Bard == true && Spell[i].Level == 7){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 8</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Bard == true && Spell[i].Level == 8){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	
	tempOutput += '<h2>Level 9</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Bard == true && Spell[i].Level == 9){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';

	document.getElementById('SpellbookCover').innerHTML = tempOutput;
}

function showClericSpells(){
	var tempOutput = '<h1>Cleric</h1><hr>';
	
	tempOutput += '<h2>Cantrips</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Cleric == true && Spell[i].Level == 0){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 1</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Cleric == true && Spell[i].Level == 1){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 2</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Cleric == true && Spell[i].Level == 2){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 3</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Cleric == true && Spell[i].Level == 3){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 4</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Cleric == true && Spell[i].Level == 4){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 5</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Cleric == true && Spell[i].Level == 5){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 6</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Cleric == true && Spell[i].Level == 6){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 7</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Cleric == true && Spell[i].Level == 7){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 8</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Cleric == true && Spell[i].Level == 8){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 9</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Cleric == true && Spell[i].Level == 9){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	document.getElementById('SpellbookCover').innerHTML = tempOutput;
}


function showDruidSpells(){
	var tempOutput = '<h1>Druid</h1><hr>';
	
	tempOutput += '<h2>Cantrips</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Druid == true && Spell[i].Level == 0){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 1</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Druid == true && Spell[i].Level == 1){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 2</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Druid == true && Spell[i].Level == 2){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 3</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Druid == true && Spell[i].Level == 3){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 4</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Druid == true && Spell[i].Level == 4){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 5</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Druid == true && Spell[i].Level == 5){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 6</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Druid == true && Spell[i].Level == 6){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 7</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Druid == true && Spell[i].Level == 7){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 8</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Druid == true && Spell[i].Level == 8){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 9</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Druid == true && Spell[i].Level == 9){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	document.getElementById('SpellbookCover').innerHTML = tempOutput;
}


function showPaladinSpells(){
	var tempOutput = '<h1>Paladin</h1><hr>';
	
	tempOutput += '<h2>Level 1</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Paladin == true && Spell[i].Level == 1){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 2</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Paladin == true && Spell[i].Level == 2){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 3</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Paladin == true && Spell[i].Level == 3){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 4</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Paladin == true && Spell[i].Level == 4){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 5</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Paladin == true && Spell[i].Level == 5){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	document.getElementById('SpellbookCover').innerHTML = tempOutput;
}

function showRangerSpells(){
	var tempOutput = '<h1>Ranger</h1><hr>';
	
	tempOutput += '<h2>Level 1</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Ranger == true && Spell[i].Level == 1){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 2</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Ranger == true && Spell[i].Level == 2){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 3</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Ranger == true && Spell[i].Level == 3){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 4</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Ranger == true && Spell[i].Level == 4){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 5</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Ranger == true && Spell[i].Level == 5){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	document.getElementById('SpellbookCover').innerHTML = tempOutput;
}

function showSorcererSpells(){
	var tempOutput = '<h1>Sorcerer</h1><hr>';
	
	tempOutput += '<h2>Cantrips</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Sorcerer == true && Spell[i].Level == 0){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 1</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Sorcerer == true && Spell[i].Level == 1){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 2</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Sorcerer == true && Spell[i].Level == 2){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 3</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Sorcerer == true && Spell[i].Level == 3){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 4</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Sorcerer == true && Spell[i].Level == 4){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 5</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Sorcerer == true && Spell[i].Level == 5){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 6</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Sorcerer == true && Spell[i].Level == 6){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 7</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Sorcerer == true && Spell[i].Level == 7){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 8</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Sorcerer == true && Spell[i].Level == 8){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 9</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Sorcerer == true && Spell[i].Level == 9){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	document.getElementById('SpellbookCover').innerHTML = tempOutput;
}

function showWarlockSpells(){
	var tempOutput = '<h1>Warlock</h1><hr>';
	
	tempOutput += '<h2>Cantrips</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Warlock == true && Spell[i].Level == 0){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 1</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Warlock == true && Spell[i].Level == 1){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 2</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Warlock == true && Spell[i].Level == 2){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 3</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Warlock == true && Spell[i].Level == 3){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 4</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Warlock == true && Spell[i].Level == 4){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 5</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Warlock == true && Spell[i].Level == 5){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 6</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Warlock == true && Spell[i].Level == 6){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 7</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Warlock == true && Spell[i].Level == 7){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 8</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Warlock == true && Spell[i].Level == 8){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 9</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Warlock == true && Spell[i].Level == 9){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	document.getElementById('SpellbookCover').innerHTML = tempOutput;
}

function showWizardSpells(){
	var tempOutput = '<h1>Wizard</h1><hr>';
	
	tempOutput += '<h2>Cantrips</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Wizard == true && Spell[i].Level == 0){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 1</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Wizard == true && Spell[i].Level == 1){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 2</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Wizard == true && Spell[i].Level == 2){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 3</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Wizard == true && Spell[i].Level == 3){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 4</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Wizard == true && Spell[i].Level == 4){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 5</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Wizard == true && Spell[i].Level == 5){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 6</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Wizard == true && Spell[i].Level == 6){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 7</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Wizard == true && Spell[i].Level == 7){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 8</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Wizard == true && Spell[i].Level == 8){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	tempOutput += '<h2>Level 9</h2><ul>';
	for(i = 0; i < Spell.length; i++){
		if(Spell[i].Wizard == true && Spell[i].Level == 9){
			tempOutput += '<li onclick="showSpell(Spell[' + i + '])">'
			tempOutput += '<a href="#Top">' + Spell[i].Name;
			if(Spell[i].Ritual){tempOutput += " (R)";}
			if(Spell[i].Concentration){tempOutput += "(C)";}
			if(Spell[i].HigherLevels){tempOutput += "(+)";}
			tempOutput += '</a></li>';
		}
	}
	tempOutput += '</ul><hr>';
	
	document.getElementById('SpellbookCover').innerHTML = tempOutput;
}





















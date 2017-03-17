function claimDMStatus(){
	MyCharacter.PName = document.getElementById('PlayerName').value;
	//if(MyCharacter.PName != ""){
	if(MyCharacter.PName){
		
		//showScreen('DMMain');
		showDMScreen('DMMain');
		document.getElementById('DMScreenButton').style.visibility = 'visible';
		document.getElementById('clearInitButton').style.visibility = 'visible';
		document.getElementById('NotesScreenButton').style.visibility = 'visible';
		document.getElementById('CommentsScreenButton').style.visibility = 'visible';
			
		var msg = {
			CName: 'Dungeon Master',
			PName: MyCharacter.PName
		};
		socket.emit('DMSubmitted', msg);
	}
	else{
		document.getElementById('PlayerName').style.backgroundColor = "red";
		setTimeout(flashWhite, 1000);
	}
}


function DMUpdatePlayerStats(iPlayers){
	var tempOutput = "";
	for(var i = 0; i < iPlayers.length; i++){
		var AC = Number(iPlayers[i].BaseAC) + Number(iPlayers[i].ACMod);
		
		var percep = 10 + calcStatBonus(iPlayers[i].WIS);
		if(iPlayers[i].profPerception){
			percep = percep + iPlayers[i].ProfBonus;
		}
		

		tempOutput += iPlayers[i].CName + ' - ' + iPlayers[i].CharacterLevel + " " +iPlayers[i].Class + '<br>';
		tempOutput += 'HP: ' + iPlayers[i].HPCurrent + " / " + iPlayers[i].HPMax + '<br>';
		if(iPlayers[i].TempHPMax > 0){
			tempOutput += 'Temp HP: ' + iPlayers[i].TempHPCurrent + " / " + iPlayers[i].TempHPMax + '<br>';
		}
		tempOutput += 'AC: ' + AC + '<br>';
		tempOutput += 'Passive Perception: ' + percep + '<hr>';
		
		//Current AC
		//Passiv Perception/Insight
	}
	
	document.getElementById('DMPlayerStatsSide').innerHTML = tempOutput;
}
function claimGMStatus(){
	MyCharacter.PName = document.getElementById('GMName').value;
	//if(MyCharacter.PName != ""){
	if(MyCharacter.PName){
		
		showScreen('GMScreen');
		document.getElementById('GMScreenButton').style.visibility = 'visible';
		document.getElementById('clearInitButton').style.visibility = 'visible';
		document.getElementById('NotesScreenButton').style.visibility = 'visible';
		document.getElementById('CommentsScreenButton').style.visibility = 'visible';
		//document.getElementById('GMFunScreenButton').style.visibility = 'visible';
		
		var msg = {
			CName: 'Dungeon Master',
			PName: MyCharacter.PName
		};
		socket.emit('GMSubmitted', msg);
	}
	else{
		document.getElementById('GMName').style.backgroundColor = "red";
		setTimeout(flashWhite, 1000);
	}
}


function rollGMDice(sides, plus, diceNum){
	var tempName = MyCharacter.CName;
	MyCharacter.CName = document.getElementById('GMRollName').value;
	if(MyCharacter.CName == ""){MyCharacter.CName = 'Dungeon Master'};
	var skillNameTemp;
	if(sides == 20){
		var adv = GMAdvCheck();
		skillNameTemp = document.getElementById('GMRollType').value;
		if(skillNameTemp == ""){ skillNameTemp = 'd20'};
		rolld20Dice(plus, adv, skillNameTemp)
	
	}else{
		skillNameTemp = 'd' + sides;
		rollSidedDice(sides, plus, diceNum, skillNameTemp);	
	}
	
	MyCharacter.CName = tempName;
}


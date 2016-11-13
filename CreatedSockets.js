var socket = io.connect();

socket.on('20DiceResult', function(msg){
	updateResultList(msg);
});

socket.on('sidedDiceResult', function(msg){
	updateResultList(msg);
});


socket.on('RcvGMData', function(iPlayers){
	GMUpdatePlayerStats(iPlayers);
});


socket.on('UpdateGM', function(GMInput){
	GMData.ID = GMInput.ID;
	GMData.PName = GMInput.PName;
	GMData.CName = GMInput.CName;
	updatePlayerList();
	updatePrivateMsgList();
	if(GMData.ID != ""){
		document.getElementById('GMLogin').style.visibility = 'hidden';
	}
});

socket.on('UpdatePlayerList', function(ServerPlayerList){
	LocalPlayerList = ServerPlayerList;
	updatePlayerList();
	updatePrivateMsgList();
});

socket.on('SendStartingData', function(IDNum, GMDataRecieved, ServerPlayerList, ServerInitList){
	LocalPlayerList = ServerPlayerList;
	MyCharacter.playerID = IDNum;
	GMData = GMDataRecieved;
	if(GMData.ID != ""){
		document.getElementById('GMLogin').style.visibility = 'hidden';
	}
	updateInitList(ServerInitList);
});

socket.on('ClearGM', function(GMDataRecieved){
	GMData = GMDataRecieved;
});

socket.on('PvtMsgRcv', function(msg){
		updateResultList(msg);
});






var socket = io.connect();





	
socket.on('RcvDMData', function(iPlayers){
	DMUpdatePlayerStats(iPlayers);
});


socket.on('UpdateDM', function(DMInput){
	DMData.ID = DMInput.ID;
	DMData.PName = DMInput.PName;
	DMData.CName = DMInput.CName;
	updatePlayerList();
	//updatePrivateMsgList();
	if(DMData.ID){
		document.getElementById('ClaimDMButton').style.visibility = 'hidden';
	}
});

socket.on('UpdatePlayerList', function(ServerPlayerList){
	LocalPlayerList = ServerPlayerList;
	updatePlayerList();
	//updatePrivateMsgList();
});

socket.on('SendStartingData', function(IDNum, DMDataRecieved, ServerPlayerList, ServerInitList){
	LocalPlayerList = ServerPlayerList;
	MyCharacter.playerID = IDNum;
	DMData = DMDataRecieved;
	if(DMData.ID){
		document.getElementById('ClaimDMButton').style.visibility = 'hidden';
	}
	updateInitList(ServerInitList);
});

socket.on('ClearDM', function(DMDataRecieved){
	DMData = DMDataRecieved;
	document.getElementById('ClaimDMButton').style.visibility = 'visible';
});

socket.on('PvtMsgRcv', function(msg){
		updateChat(msg);
});

socket.on('ChatMsgRcv', function(msg){
		updateChat(msg);
});





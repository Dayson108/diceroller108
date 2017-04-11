


function linkSocketIDs(ToolSocketId, CharName, PlayerName){
	socket.emit('LinkSockets', ToolSocketId, CharName, PlayerName)
}

function HideMain(status){
	if(status == 1){
		document.getElementById('PlayerLists').style.visibility = "hidden";
		document.getElementById('ChatList').style.visibility = "hidden";
		document.getElementById('ChatButtons').style.visibility = "hidden";
	}
	else{
		document.getElementById('PlayerLists').style.visibility = "visible";
		document.getElementById('ChatList').style.visibility = "visible";
		document.getElementById('ChatButtons').style.visibility = "visible";
	}
		
}

function sendPrivateMessage(toSocket, msg, senderName){
	socket.emit('PrivateMsgSend', toSocket, msg, senderName);
}




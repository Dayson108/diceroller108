//socket for starting data will need updating

var GMPrivateInit = [];
var GMInitSave = [];
function GMAddToPrivateInit(){
	var i = 0;
	if (document.getElementById('GMInitNamePrivate').value != ""){
		var init;
		var myStatus = 0;
		if(document.getElementById('GMRollPrivateInit').checked){
			init = Math.floor((Math.random() * 20) + 1); 
			if(init == 20){
				myStatus = 1;
			}
			else if(init == 1){
				myStatus = -1;
			}
			init = Number(document.getElementById('GMAddInitPlusPrivate').value) + init;
			
		}
		else if(document.getElementById('GMAddPrivateInit').checked){
			init = Number(document.getElementById('GMAddInitPrivate').value);
		}
		var initRoll = {
			roll: init,
			status: myStatus,
			name: document.getElementById('GMInitNamePrivate').value
		};
			
		GMPrivateInit.push(initRoll);
		updateInitList(GMInitSave);
		
	}
	else{
		document.getElementById('GMInitNamePrivate').style.backgroundColor = "red";
		setTimeout(flashWhite, 1000);
	}
}
		
function GMAddToInit(){
	if (document.getElementById('GMInitName').value != ""){
		var init;
		var myStatus = 0;
		if(document.getElementById('GMRollInit').checked){
			init = Math.floor((Math.random() * 20) + 1); 
			if(init == 20){
				myStatus = 1;
			}
			else if(init == 1){
				myStatus = -1;
			}
			init = Number(document.getElementById('GMAddInitPlus').value) + init;
		}
		else if(document.getElementById('GMAddInit').checked){
			init = Number(document.getElementById('GMAddInitValue').value);
		}
		var initRoll = {
			roll: init,
			status: myStatus,
			name: document.getElementById('GMInitName').value
		};
		socket.emit('InitRoll', initRoll);
		
	}
	else{
		document.getElementById('GMInitName').style.backgroundColor = "red";
		setTimeout(flashWhite, 1000);
	}
}


function updateInitList(ServerInitList){
	var list = [];
	GMInitSave = [];
	
	for(var i = 0; i < ServerInitList.length; i++){
		var tempInit ={
			roll: ServerInitList[i].roll,
			status: ServerInitList[i].status,
			name: ServerInitList[i].name
		};
		var tempInit3 ={
			roll: ServerInitList[i].roll,
			status: ServerInitList[i].status,
			name: ServerInitList[i].name
		};
		list.push(tempInit);
		GMInitSave.push(tempInit3);
	}
	for(var i = 0; i < GMPrivateInit.length; i++){
		var tempInit = {
			roll: GMPrivateInit[i].roll,
			status: GMPrivateInit[i].status,
			name: GMPrivateInit[i].name
		}
		list.push(tempInit)
	}
	

	//sort list here

	list.sort(function(a,b){return b.roll - a.roll});
	//sort end
	listLength = list.length;
	var tempOutput = "<ul>";
	
	for(var i = 0; i < listLength; i++){
		tempOutput += '<li>';
		
				
		if(list[i].status == 1){
			tempOutput += "**"
		}else if(list[i].status == -1){
			tempOutput += "--"
		}
		tempOutput += list[i].name + ": " + list[i].roll;
		
		if(list[i].status == 1){
			tempOutput += "**"
		}else if(list[i].status == -1){
			tempOutput += "--"
		}
		tempOutput += '</li><hr>';
	}
	
		tempOutput += '</ul>';
	document.getElementById('initList').innerHTML = tempOutput;
	
	
}//end UpdateInitList()



function rollInit(){
	var myStatus = 0;
	var myRoll = Math.floor((Math.random() * 20) + 1);
	if(myRoll == 20){
		myStatus = 1;
	}
	else if(myRoll == 1){
		myStatus = -1;
	}
	
	myRoll = MyCharacter.DEXP() + myRoll;

	var initRoll = {
		roll: myRoll,
		status: myStatus,
		name: MyCharacter.CName
	};
	
	
	socket.emit('InitRoll', initRoll);
	document.getElementById("initbutton").disabled = true;

}



socket.on('ServerUpdateInitList', function(msg){
		updateInitList(msg);
});


socket.on('ClearInitRecieved', function(){
	document.getElementById('initList').innerHTML = "";
	document.getElementById("initbutton").disabled = false;
});

function clearInit(){
	GMPrivateInit = [];
	GMInitSave = [];
	socket.emit('ClearInit');
}

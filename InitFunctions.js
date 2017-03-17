//socket for starting data will need updating

var DMPrivateInit = [];
var DMInitSave = [];
function DMAddToPrivateInit(){
	var i = 0;
	if (document.getElementById('DMInitNamePrivate').value != ""){
		var init;
		var myStatus = 0;
		if(document.getElementById('DMRollPrivateInit').checked){
			init = Math.floor((Math.random() * 20) + 1); 
			if(init == 20){
				myStatus = 1;
			}
			else if(init == 1){
				myStatus = -1;
			}
			init = Number(document.getElementById('DMAddInitPlusPrivate').value) + init;
			
		}
		else if(document.getElementById('DMAddPrivateInit').checked){
			init = Number(document.getElementById('DMAddInitPrivate').value);
		}
		var initRoll = {
			roll: init,
			status: myStatus,
			name: document.getElementById('DMInitNamePrivate').value
		};
			
		DMPrivateInit.push(initRoll);
		updateInitList(DMInitSave);
		
	}
	else{
		document.getElementById('DMInitNamePrivate').style.backgroundColor = "red";
		setTimeout(flashWhite, 1000);
	}
}
		
function DMAddToInit(){
	if (document.getElementById('DMInitName').value != ""){
		var init;
		var myStatus = 0;
		if(document.getElementById('DMRollInit').checked){
			init = Math.floor((Math.random() * 20) + 1); 
			if(init == 20){
				myStatus = 1;
			}
			else if(init == 1){
				myStatus = -1;
			}
			init = Number(document.getElementById('DMAddInitPlus').value) + init;
		}
		else if(document.getElementById('DMAddInit').checked){
			init = Number(document.getElementById('DMAddInitValue').value);
		}
		var initRoll = {
			roll: init,
			status: myStatus,
			name: document.getElementById('DMInitName').value
		};
		socket.emit('InitRoll', initRoll);
		
	}
	else{
		document.getElementById('DMInitName').style.backgroundColor = "red";
		setTimeout(flashWhite, 1000);
	}
}


function updateInitList(ServerInitList){
	var list = [];
	DMInitSave = [];
	
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
		DMInitSave.push(tempInit3);
	}
	for(var i = 0; i < DMPrivateInit.length; i++){
		var tempInit = {
			roll: DMPrivateInit[i].roll,
			status: DMPrivateInit[i].status,
			name: DMPrivateInit[i].name
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
	
	myRoll = MyCharacter.DEXP() + myRoll + Number(document.getElementById('intMod').value);

	var initRoll = {
		roll: myRoll,
		status: myStatus,
		name: MyCharacter.CName,
		playerID: ""
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
	DMPrivateInit = [];
	DMInitSave = [];
	socket.emit('ClearInit');
}

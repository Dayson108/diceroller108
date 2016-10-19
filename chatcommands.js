function clearChat(){
  LocalResultList = []
  document.getElementById('ResultListMain').innerHTML = "";
}

function updateResultList(newInput){
  /*Status Codes:
  * -1  Nat 1
  * 0 Dice Roll Result
  * 1 Nat 20
  */
  LocalResultList.push(newInput);
  var tempOutput = "";
  var i = 0;
  var listLength = LocalResultList.length;
  tempOutput = "<ul>";
  for(i = listLength; i > 0; --i){
    tempOutput += "<li>";
    if(LocalResultList[i-1].status == 1){
      tempOutput += "**"
    }
    else if(LocalResultList[i-1].status == -1)
    {
      tempOutput += "--"
    }
    tempOutput += LocalResultList[i - 1].name + ": ";
    tempOutput += LocalResultList[i - 1].result;
    if(LocalResultList[i-1].status == 1){
      tempOutput += "**"
    }
    else if(LocalResultList[i-1].status == -1)
    {
      tempOutput += "--"
    }
    tempOutput += "</li><hr>";
  }
  tempOutput += "</ul>";
  document.getElementById('ResultListMain').innerHTML = tempOutput;
  }

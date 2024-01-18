var websiteName=document.getElementById('siteName');
var websiteURL=document.getElementById("siteURL");
var urlErr=document.getElementById("wrongUrl");
var nameErr=document.getElementById("wrongName");
var searchInput=document.querySelector(".searchInput");



var siteList;
var idCounter=0;

if(localStorage.getItem("siteList")==null){
    siteList=[];
    idCounter=0;


}else{
    siteList=JSON.parse(localStorage.getItem("siteList"))
    displaySite(siteList);
    // idCounter = siteList[siteList.length-1].id +1
}


function addSite(){
   if (validateWebsiteUrl() && validateNameSite()){
    var siteName={
        websiteName:websiteName.value,
        websiteURL:websiteURL.value,
        id: idCounter,
       
    }

    siteList.push(siteName);
    console.log(idCounter);
    idCounter++;
    
    localStorage.setItem("siteList",JSON.stringify(siteList));
    displaySite(siteList);
    clearForm();
}
}

function displaySite(list){
var cartona=``;
for(var i=0;i<list.length;i++){
cartona +=` <tr>
<td>${i+1}</td>
<td>${list[i].websiteName}</td>

<th><button onclick="visitUrl(${i})"  class="btn btn-warning">Visit</button></th>
<th><button onclick="deleteSite(${list[i].id})" class="btn btn-danger">Delete</button></th>
</tr>`
}
document.getElementById("tBody").innerHTML=cartona;
}


function clearForm(){

    websiteName.value="";
    websiteURL.value="";
    
}

function deleteSite(index){
    var foundIndex=siteList.findIndex(siteName=>siteName.id===index);
    siteList.splice(foundIndex,1);
     localStorage.setItem("siteList",JSON.stringify(siteList));
    displaySite(siteList);
    
}



function validateWebsiteUrl(){
    var regex = /^(https:\/\/www\.)?[a-zA-Z]{2,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,3})?$/;
    if (regex.test(websiteURL.value)==true){
        websiteURL.style.border="none";
        urlErr.classList.add("d-none");
        return true;
    }else{
        websiteURL.style.border="5px solid red";
        urlErr.classList.remove("d-none");
        return false;
    }
}




function validateNameSite(){
    if (websiteName.value ==""){
        websiteName.style.border="5px solid red";
        nameErr.classList.replace("d-none", "d-block");
        console.log("empty");
        return false;
    }else{
        websiteName.style.border="none";
        nameErr.classList.replace("d-block", "d-none");
        return true;
    }
}


function searchByName(term){
    var foundedItems=[];
    for(var i=0;i<siteList.length;i++){
    if(siteList[i].websiteName.toLowerCase().includes(term.toLowerCase())==true){
    foundedItems.push(siteList[i]);
}}
displaySite(foundedItems);
}


function visitUrl(i){
    window.open(siteList[i].websiteURL,'_blank');
    
  }



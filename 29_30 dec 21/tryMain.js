(function () {
   
 let Button = document.querySelector('#firstbtn');
 let Pagetemplate = document.querySelector('#MyTemplate');  
 let Container = document.querySelector('#container');
 let fid = -1;
 let folders =[];
  

 Button.addEventListener('click', addfolder);
 
 function addfolder(){
    let folderName = prompt("Name your folder !");
    if(!!folderName){
        let exists = folders.some(f => f.name == folderName)
        if(exists == false){
            fid++;
            folders.push({
                id: fid,
                name:folderName
            })
            addhtmlpage(folderName, fid);
            savetostorage(folderName);
        }
        else{
            alert("this " + folderName + " alerady exists !!")
        }
    } else{
        alert("Please Enter a Name !!")
    }

 }


 function editfolder(){
    alert("editing");
 }

 function deletefolder() {
    alert("deleting");
 }


 function addhtmlpage(folderName, fid){
    let myTemplate= Pagetemplate.content.querySelector(".folder");
    let divfolder = document.importNode(myTemplate, true);

    let divName = divfolder.querySelector("[purpose = 'name']");

    let spanEdit = divfolder.querySelector("[action = 'edit']");
    let spanDelete = divfolder.querySelector("[action = 'delete']");

    divName.innerHTML = folderName;
    divfolder.setAttribute("fid" , fid)
    spanDelete.addEventListener('click' , deletefolder);
    spanEdit.addEventListener('click' , editfolder);  
    Container.appendChild(divfolder);  
 }


 function loadfromstorage(){
    let fjson = localStorage.getItem("data");
    if(!!fjson){
        folders = JSON.parse(fjson);
        folders.forEach(f => {
            if(f.id>fid){
                fid = f.id;
            }
        
            addhtmlpage(f.name , fid)
        });
    }
 }


 function savetostorage(){
 let fjson = JSON.stringify(folders);
 localStorage.setItem("data" , fjson);

}


loadfromstorage();



})()
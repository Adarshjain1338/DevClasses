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
        let exists = folders.some(f => f.name = folderName)
        if(exists == false){

        }
        else{
            alert("this " + folderName + " alerady exists !!")
        }
    } else{
        alert("Please Enter a Name !!")
    }

 }


 function editfolder(){

 }

 function deletefolder() {

 }


 function addhtmlpage(){
    let MyTemplate= MyTemplate.content.querySelector('.folder');
    let divfolder = document.importNode('MyTemplate', true);

    let divName = divfolder.querySelector("[purpose = 'name']");

    let spanEdit = divfolder.querySelector("[action = 'edit']");
    let spanDelete = divfolder.querySelector("[action = 'delete']");

    divName.innerHTML = folderName;
    spanDelete.addEventListener('click' , deletefolder);
    spanEdit.addEventListener('click' , editfolder);  
    Container.appendChild(divfolder);  
 }


 function loadfromstorage(){
    let fjson = localStorage.getItem("data");
 }


 function savetostorage(){
 let fjson = JSON.stringify(folders);
 localStorage.setItem("data" , fjson);

}






})()
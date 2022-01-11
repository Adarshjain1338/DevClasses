(function () {
    let btnAddfolder = document.querySelector("#addFolder");
    let btnTextFile = document.querySelector("#addTextFile");
    let divBreadCrumb = document.querySelector("#breadCrumb");
    let divContianer = document.querySelector("#container");
    let templates = document.querySelector("#templates");
    let resources = [];
    let cfid = -1;
    let rid = 0;
    
    
    btnAddfolder.addEventListener('click', addFolder);
    btnTextFile.addEventListener('click', addTextFile);
    /*
    ----Add Folder---
    1> we entering name of the folder from user using prompt.
    2> now we are checking if the passed name by user is not equal to null {mtlb name pass kiya hai} but they added spaces in starting or ending . so, we are triming those spaces.
    3> checking the name exists => in our resourses , if our resources name folder = folder name and woh same parent id ka hai jo abhi current id ka hai toh. already exists keh do usko
    4> now pid of this.folder is cfid.
    5> then we just increase rid by one , everytime this function is run rid will plus one .
    6> adding those folder to our HTML sheet .
    7> in our RAM using push method => pushing rid ,name , pid , type.
    8> also saving new folder in our browser storage .
    */
   
   function addFolder() {
       let fname = prompt("Enter folder's name");
       if(fname != null){
           fname = fname.trim();
        }
        if(!fname){ // empty name validation
            alert("Empty name is not allowed.");
            return;
        }
        // uniqueness of name validation
        let alreadyExists = resources.some(f=>f.rname == fname && f.pid == cfid);
        if(alreadyExists == true){
            alert("This folder =>  "+fname+" Already exists !!");
            return;
        }
        let pid = cfid;
        rid++;
        addFolderHTML(fname, rid, pid);
        resources.push({
            rid: rid,
            rname: fname,
            rtype: "Folder",
            pid: cfid
        })
        saveToStorage();
    }
    function addTextFile() {
        let tfname = prompt("Enter Text file name ?");
        console.log(tfname);
    }
    function deleteTextfile() {
        
    }
    function deleteFolder() {
        console.log('in delete');
    }
    function renameFolder() {
        console.log('in rename');
    }
    function renameTextfile() {
        
    }

    function viewTextFile() {

    }
    function viewFolder() {
        console.log('in view');
    }
    function addFolderHTML(rname , rid , pid){
        let divFolderTemplate = templates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate , true);

        spanRename = divFolder.querySelector("[action = 'rename']");
        spanDelete = divFolder.querySelector("[action = 'delete']");
        spanView = divFolder.querySelector("[action = 'view']");
        divName = divFolder.querySelector("[purpose = 'name']");

        divName.innerHTML = rname;
        divFolder.setAttribute("rid", rid);
        divFolder.setAttribute("pid", pid)
        spanRename.addEventListener('click',renameFolder);
        spanDelete.addEventListener('click',deleteFolder);
        spanView.addEventListener('click',viewFolder);

        divContianer.appendChild(divFolder);
    }
    function saveToStorage(){
        let jso = JSON.stringify(resources);
        localStorage.setItem("data", jso);

    }
/*
-- --Load From Storage --- 
we use because we want to save our data , even when we try to refresh it basically we load all the previous data from our browser storage
1> we are getting a data from our browser.
2> now we are checking that our json is empty or not empty.
3> the data we are getting it . It is in the JSON fromat . we want it string and we saved our data in our resource array . 
4> we looped our resource array because "Hum wohi folder ko show karwana chata hai jiska pid match karta ko cfid se . cfid is current folder and pid is parent id"
5> if our rid is smaller then our storage rid then we replaace it.
*/
    function loadFromStorage(){
        let json = localStorage.getItem("data")
        if(!!json){
            resources= JSON.parse(json);
            resources.forEach(f => {if(f.pid === cfid){
                addFolderHTML(f.rname, f.rid, f.pid);
            }
            if(f.rid>rid){
                rid = f.rid;
            }
         })
        }
    }
    loadFromStorage();
    
})();




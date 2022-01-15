(function () {
    let btnAddfolder = document.querySelector("#addFolder");
    let btnTextFile = document.querySelector("#addTextFile");
    let divBreadCrumb = document.querySelector("#breadCrumb");
    let aRootPath = divBreadCrumb.querySelector("a[purpose='path']");
    let divContianer = document.querySelector("#container");
    let templates = document.querySelector("#templates");
    let resources = [];
    let cfid = -1;
    let rid = 0;
    
    
    btnAddfolder.addEventListener('click', addFolder);
    btnTextFile.addEventListener('click', addTextFile);
    aRootPath.addEventListener('click', viewFolderFromPath);
    
   
   function addFolder() {
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
       let fname = prompt("Enter folder's name");
       if(fname != null){
           fname = fname.trim();
        }
        if(!fname){ // empty name validation
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
        let fname = prompt("Enter Text file name ?");
       if(fname != null){
           fname = fname.trim();
        }
        if(!fname){ // empty name validation
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
        addTextFileHTML(fname, rid, pid);
        resources.push({
            rid: rid,
            rname: fname,
            rtype: "Text-file",
            pid: cfid
        })
        saveToStorage();
    }

    function deleteTextfile() {
        
    }

    function deleteFolder() {
        let spanDelete = this;
        let divFolder = spanDelete.parentNode;
        let divName = divFolder.querySelector("[purpose = 'name']");
        let fidTBD = parseInt(divFolder.getAttribute("rid"));
        let fname = divName.innerHTML;
        let sure = confirm(`Are you sure you want to delete ${fname} ?`);
        if(!sure){
            return;
        }

        // Folder To Be Deleted from HTML.
            divContianer.removeChild(divFolder);

        // Folder To Be Deleted from RAM.
             deleteHelper(fidTBD);

        // Folder To Be Deleted from Storage of Browser.
            saveToStorage();

    }
    function deleteHelper(deletefolderId){
        let children = resources.filter(f => f.pid == deletefolderId);
        for(let i = 0; i < children.length; i++){
            deleteHelper(children[i].rid);
        }
        let ridx = resources.findIndex(f=>f.rid == deletefolderId);
        console.log(resources[ridx].rname);
        resources.splice(ridx,1);
    }
    function renameFolder() {
        let nfname = prompt("Enter a new Name ?");
        if(nfname != null){
            nfname = nfname.trim();
        }
        if(!nfname){ // empty name validation
            alert("Empty name is not allowed.");
            return;
        }
        let spanRename = this;
        let divFolder = spanRename.parentNode;
        let divName = divFolder.querySelector("[purpose = 'name']");
        let ofname = divName.innerHTML;
        let ridTBU = parseInt(divFolder.getAttribute("rid"));
        
        if(nfname == ofname){
            alert("This Name is already in use .");
            return;
        }

        let alreadyExists = resources.some(f => f.rname == nfname && f.pid == cfid);
        if(alreadyExists == true){
            alert("This name of folder Already exists !!");
            return;
        }
        // Change this data in HTML.
        divName.innerHTML = nfname;

        // Change this data in RAM.
        let resourceidOfThis = resources.find(f => f.rid == ridTBU);
        resourceidOfThis.rname = nfname;

        // Change this data in Storage of browser.
        saveToStorage();
    }

    function renameTextfile() {  

    }

    function viewTextFile() {

    }
    function viewFolder() {
        let spanView = this;
        let divFolder = spanView.parentNode;
        let divName = divFolder.querySelector("[purpose = 'name']");

        let fname = divName.innerHTML;
        let fid = parseInt(divFolder.getAttribute("rid"));
        let pathTemplate = templates.content.querySelector("a[purpose='path']");
        let aPath = document.importNode(pathTemplate, true);
        aPath.addEventListener('click', viewFolderFromPath);
        aPath.innerHTML = fname;
        aPath.setAttribute("rid", fid);
        divBreadCrumb.appendChild(aPath);

        cfid = fid;
        divContianer.innerHTML= "";
        if(resources.find(f=>f.rtype=="Folder")){   
            resources.filter(f=>f.rtype=="Folder").forEach(f => {
                    if (f.pid === cfid) {
                        addFolderHTML(f.rname, f.rid, f.pid);
                    }
                
                if (f.rid > rid) {
                    rid = f.rid;
                }
            })
        }
        if(resources.find(f=>f.rtype=="Text-file")){
            resources.filter(f=>f.rtype=="Text-file").forEach(f => {
                    if (f.pid === cfid) {
                        addTextFileHTML(f.rname, f.rid, f.pid);
                    }
                
                if (f.rid > rid) {
                    rid = f.rid;
                }
            })
        }
        


    }
    function viewFolderFromPath(){
        let aPath = this;
        let fid = parseInt(aPath.getAttribute("rid"));

        while(aPath.nextSibling){
            aPath.parentNode.removeChild(aPath.nextSibling);
        }
        cfid = fid;
        divContianer.innerHTML = "";
        if(resources.find(f=>f.rtype == "Folder")){   
            resources.filter(f=>f.rtype=="Folder").forEach(f => {
                    if (f.pid === cfid) {
                        addFolderHTML(f.rname, f.rid, f.pid);
                    }
                
                if (f.rid > rid) {
                    rid = f.rid;
                }
            })
        }
        if(resources.find(f=>f.rtype == "Text-file")){
            resources.filter(f=>f.rtype=="Text-file").forEach(f => {
                    if (f.pid === cfid) {
                        addTextFileHTML(f.rname, f.rid, f.pid);
                    }
                
                if (f.rid > rid) {
                    rid = f.rid;
                }
            })
        }
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
    function addTextFileHTML(rname , rid , pid){
        let divFolderTemplate = templates.content.querySelector(".Text-file");
        let divTextFile = document.importNode(divFolderTemplate , true);

        spanRename = divTextFile.querySelector("[action = 'rename']");
        spanDelete = divTextFile.querySelector("[action = 'delete']");
        spanView = divTextFile.querySelector("[action = 'view']");
        divName = divTextFile.querySelector("[purpose = 'name']");

        divName.innerHTML = rname;
        divTextFile.setAttribute("rid", rid);
        divTextFile.setAttribute("pid", pid)
        spanRename.addEventListener('click',renameFolder);
        spanDelete.addEventListener('click',deleteFolder);
        spanView.addEventListener('click',viewFolder);

        divContianer.appendChild(divTextFile);
    }
    function saveToStorage(){
        let jso = JSON.stringify(resources);
        localStorage.setItem("data", jso);

    }

    function loadFromStorage() {
/*
    -- --Load From Storage --- 
    we use because we want to save our data , even when we try to refresh it basically we load all the previous data from our browser storage
    1> we are getting a data from our browser.
    2> now we are checking that our json is empty or not empty.
    3> the data we are getting it . It is in the JSON fromat . we want it string and we saved our data in our resource array . 
    4> we looped our resource array because "Hum wohi folder ko show karwana chata hai jiska pid match karta ko cfid se . cfid is current folder and pid is parent id"
    5> if our rid is smaller then our storage rid then we replaace it.
*/
        let json = localStorage.getItem("data")
        if (!!json) {
            resources = JSON.parse(json);
            // let typeofFolder =resources.filter(f=>f.rtype=="Folder");
            // let typeofFile=resources.filter(f=>f.rtype=="Text-file");

            if (resources.find(f => f.rtype == "Folder")) {
                resources.filter(f => f.rtype == "Folder").forEach(f => {
                    if (f.pid === cfid) {
                        addFolderHTML(f.rname, f.rid, f.pid);
                    }
                    if (f.rid > rid) {
                        rid = f.rid;
                    }
                })
            }
            if (resources.find(f => f.rtype == "Text-file")) {
                resources.filter(f => f.rtype == "Text-file").forEach(f => {
                    if (f.pid === cfid) {
                        addTextFileHTML(f.rname, f.rid, f.pid);
                    }

                    if (f.rid > rid) {
                        rid = f.rid;
                    }
                })
            }
        }
    }
    loadFromStorage();

})();




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

    function addFolder() {
        let fname = prompt("Enter folder's file name ?");
        rid++;
        let pid = cfid;
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
5>



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
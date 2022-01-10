(function () {
    let btnAddfolder = document.querySelector("#addFolder");
    let btnTextFile = document.querySelector("#addTextFile");
    let divBreadCrumb = document.querySelector("#breadCrumb");
    let divContianer = document.querySelector("#container");
    let templates = document.querySelector("#templates");

    btnAddfolder.addEventListener('click', addFolder);
    btnTextFile.addEventListener('click', addTextFile);

    function addFolder() {
        let fname = prompt("Enter folder's file name ?");
        
        let divFolderTemplate = templates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate , true);

        spanRename = divFolder.querySelector("[action = 'rename']");
        spanDelete = divFolder.querySelector("[action = 'delete']");
        spanView = divFolder.querySelector("[action = 'view']");
        divName = divFolder.querySelector("[purpose = 'name']");
        divName.innerHTML = fname;
        spanRename.addEventListener('click',renameFolder);
        spanDelete.addEventListener('click',deleteFolder);
        spanView.addEventListener('click',viewFolder);
        divContianer.appendChild(divFolder);
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
    function saveToStorage(){

    }
    function loadFromStorage(){

    }
    loadFromStorage();
    
})();
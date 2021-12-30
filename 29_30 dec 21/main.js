
(function () {
    let btn = document.querySelector("#firstbtn");  // here we selected button with our button id that is firstbtn.
    let containerdiv = document.querySelector("#container");  //container selected
    let MyTemplate = document.querySelector("#MyTemplate");   // Template selected
    let fid = 0;
    let folders = [];


    // here we added some feature when we click our firstbtn. using addEventListener.
    btn.addEventListener("click", function () {
        let FolderName = prompt("Enter Your Folder's Name !"); // prompt key word use in when we want input from user.
        // if we leave the blank prompt then it will return and do nothing 
        if (!FolderName) {
            return;
        }
        // if you want to access a template then you have to do it like that ... 
        // template(where you catched the template in variable).content(when you want to access template).querySelector{for selection purpose}(".folder")
        let foldertemplatediv = MyTemplate.content.querySelector(".folder");
        let divfolder = document.importNode(foldertemplatediv, true); // when you want to access the content of template and copy in another variable you have to pass boolean with {want deep copy of anything} 

        let divName = divfolder.querySelector("[purpose='name']"); // we selected the name using square bracket that focus on attribut(here is purpose is attribute)
        divName.setAttribute("fid", fid++);
        /**------------------------------------------edit -------------------------------------------------- */
        let spanEdit = divfolder.querySelector("span[action = 'edit']");
        spanEdit.addEventListener("click", function () {
            let FolderName = prompt("Enter a New Name !");
            if (!FolderName) {
                return;
            }
            divName.innerHTML = FolderName;
        })
        /**------------------------------------------Delete -------------------------------------------------- */
        let SpanDelete = divfolder.querySelector("span[action= 'delete']");
        SpanDelete.addEventListener("click", function () {
            let flag = confirm("Do you want to delete it ? " + FolderName);
            if (flag == true) {
                containerdiv.removeChild(divfolder);
                let idx = folders.findIndex(f => f.id == parseInt(divfolder.getAttribute("fid")));
                folders.splice(idx, 1);
                persistFolders();
            }
        })
        divName.innerHTML = FolderName;
        containerdiv.appendChild(divfolder); // and adding whole new edited folder again .
        folders.push({
            id: fid,
            name: FolderName
        })
        persistFolders();
    })
    function persistFolders() {
        console.log(folders);
        let fjson = JSON.stringify(folders);
        localStorage.setItem("data", fjson);
    }
})();


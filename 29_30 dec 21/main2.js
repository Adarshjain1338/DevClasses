(function () {
    let btn = document.querySelector('#firstbtn');
    let divcontainer= document.querySelector('#container');
    let pageTemplates = document.querySelector('#MyTemplate');
    let folders = [];
    let fid =-1;

    btn.addEventListener("click", addFolder);
    function addFolder() {
        let fname = prompt("Enter a new Folder's Name !");
        if(!!fname){
            let fidx = folders.findIndex(f => f.name == fname);
            if(fidx == -1){
                fid++;
                //RAM
                folders.push({
                    id: fid,
                    name: fname
                });
            }
            else{
                alert(fname + " Already Exists !")
            }
            addHtmlFolder(fname,fid);
        }
        else{
            alert("Please Enter Something")
        }
        //HTML
        //STORAGE
        saveTOStoarge();
    }


    function editFolder() {
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose='name']");
        let ofname = divName.innerHTML;

        let nfname = prompt("Enter new name for " + ofname);
        if (!!nfname) {
            if (nfname != ofname) {
                let exists = folders.some(f => f.name == nfname);
                if (exists == false) {
                   // ram
                   let folder = folders.find(f => f.name == ofname);
                   folder.name = nfname;

                   // html
                   divName.innerHTML = nfname;

                   // storage
                   saveToStorage();
                } else {
                    alert(nfname + " already exists");
                }
            } else {
                alert("This is the old name only. Please enter something new.");
            }
        } else {
            alert("Please enter a name");
        }
    }



    function deleteFolder(){
        let divfolder = this.parentNode;
        let divName = divfolder.querySelector("[purpose='name']");
        let flag =confirm("are you sure you want to delete "+ divName.innerHTML+ " ?");
        if(flag==true){
            // RAM
            let fidx = folders.findIndex(f => f.name == divName.innerHTML);
            folders.splice(fidx ,1);
            //HTML
            divcontainer.removeChild(divfolder);
            //storage
            saveTOStoarge();
        }
    }


    function addHtmlFolder(fname,fid) {
        let divFolderTemplate = pageTemplates.content.querySelector(".folder");
        let divfolder = document.importNode(divFolderTemplate ,true )

        let divName = divfolder.querySelector("[purpose = 'name']");
        let spanEdit= divfolder.querySelector("[action = 'edit']");
        let spanDelete= divfolder.querySelector("[action = 'delete']");

        divName.setAttribute("fid", fid);
        divName.innerHTML = fname;
        spanEdit.addEventListener("click", editFolder);
        spanDelete.addEventListener("click", deleteFolder);
        

        divcontainer.appendChild(divfolder);
    }


    function saveTOStoarge() {
        let fjson = JSON.stringify(folders);
        localStorage.setItem("data", fjson);
    }


    function loadFromStorage() {
        let fJson = localStorage.getItem("data");
        if(!!fJson){
            folders = JSON.parse(fJson);
            folders.forEach(f => {
                if (f.id > fid) {
                    fid = f.id;
                }
                addHtmlFolder(f.name, f.id);
            });
        }
    }
    loadFromStorage();
    

})();
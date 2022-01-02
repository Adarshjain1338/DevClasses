(function () {
    let btn = document.querySelector('#firstbtn');
    let divbreadCrumb = document.querySelector('#divBreadCrumb');
    let divcontainer = document.querySelector('#container');
    let pageTemplates = document.querySelector('#MyTemplate');
    let folders = [];
    let cfid = -1;
    let fid = -1;

    btn.addEventListener("click", addFolder);
    function addFolder() {
        let fname = prompt("Enter a new Folder's Name !");
        if (!!fname) {
            let exists = folders.some(f => f.name == fname);
            if (exists == false) {
                fid++;
                //RAM
                folders.push({
                    id: fid,
                    name: fname,
                    pid: cfid
                });
                addHtmlFolder(fname, fid, cfid);
                saveToStorage();
            }
            else {
                alert(fname + " Already Exists !")
            }
            //HTML
        }
        else {
            alert("Please Enter Something")
        }
        //STORAGE
    }


    function editFolder() {
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose='name']");
        let ofname = divName.innerHTML;

        let nfname = prompt("Enter new name for " + ofname);
        if (!!nfname) {
            if (nfname != ofname) {
                let exists = folders.filter(f => f.pid == cfid).some(f => f.name == nfname);
                if (exists == false) {
                    // ram
                    let folder = folders.filter(f => f.pid == cfid).find(f => f.name == ofname);
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

    function viewFolder() {
        let divfolder = this.parentNode;
        let divName = divfolder.querySelector("[purpose = 'name']");
        cfid = parseInt(divfolder.getAttribute("fid"));

        let aPathTemplate = pageTemplates.content.querySelector(".path");
        let aPath = document.importNode(aPathTemplate, true);

        aPath.innerHTML = divName.innerHTML;
        divbreadCrumb.appendChild(aPath);

        divcontainer.innerHTML = "";
        folders
            .filter(f => f.pid == cfid)
            .forEach(f => { addHtmlFolder(f.name, f.id, f.pid); })
    }

    function deleteFolder() {
        let divfolder = this.parentNode;
        let divName = divfolder.querySelector("[purpose='name']");
        let fidtbd = divfolder.getAttribute("fid");

        let flag = confirm("are you sure you want to delete " + divName.innerHTML + " ?");
        if (flag == true) {
            // RAM
            let exists = folders.some(f => f.pid == fidtbd);
            if (exists == false) {
                let fidx = folders.findIndex(f => f.id == fidtbd);
                folders.splice(fidx, 1);

                // html
                divcontainer.removeChild(divfolder);

                // storage
                saveToStorage();
            } else {
                alert("Can't delete. Has children.");
            }

        }
    }


    function addHtmlFolder(fname, fid, pid) {
        let divFolderTemplate = pageTemplates.content.querySelector(".folder");
        let divfolder = document.importNode(divFolderTemplate, true)

        let divName = divfolder.querySelector("[purpose = 'name']");
        let spanEdit = divfolder.querySelector("[action = 'edit']");
        let spanView = divfolder.querySelector("[action = 'view'");
        let spanDelete = divfolder.querySelector("[action = 'delete']");


        divfolder.setAttribute("fid", fid);
        divfolder.setAttribute("pid", pid);
        divName.innerHTML = fname;
        spanEdit.addEventListener("click", editFolder);
        spanView.addEventListener("click", viewFolder)
        spanDelete.addEventListener("click", deleteFolder);


        divcontainer.appendChild(divfolder);
    }


    function saveToStorage() {
        let fjson = JSON.stringify(folders);
        localStorage.setItem("data", fjson);
    }


    function loadFromStorage() {
        let fJson = localStorage.getItem("data");
        if (!!fJson) {
            folders = JSON.parse(fJson);
            folders.forEach(f => {
                if (f.id > fid) {
                    fid = f.id;
                }
                if (f.pid === cfid) {
                    addHtmlFolder(f.name, f.id, cfid);
                }
            });
        }
    }
    loadFromStorage();


})();
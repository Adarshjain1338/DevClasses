(function () {
    let saveAlbum = document.querySelector("#saveAlbum");
    let addAlbum = document.querySelector("#addAlbum");
    let deleteAlbum = document.querySelector("#deleteAlbum");
    let importAlbum = document.querySelector("#importAlbum");
    let exportAlbum = document.querySelector("#exportAlbum");
    let playAlbum = document.querySelector("#playAlbum");
    let selectAlbum = document.querySelector("#selectAlbum");
    let allTemplates = document.querySelector("#allTemplates");
    let overlay = document.querySelector("#overlay");
    let contentDetailsOverlay = document.querySelector("#contentDetailsOverlay");
    let newSlide = document.querySelector("#new-slide");
    let slideList = document.querySelector("#slide-list");
    let createSlide = document.querySelector("#create-slide");
    let showSlide = document.querySelector("#show-slide");
    let btnSaveSlide = document.querySelector("#btnSaveSlide");
    let txtSlideTitle = document.querySelector("#txtSlideTitle");
    let txtSlideUrl = document.querySelector("#txtSlideUrl");
    let txtSlideDesc = document.querySelector("#txtSlideDesc");
    let uploadFile = document.querySelector("#uploadFile");

    let albums = [];

    addAlbum.addEventListener('click', handleAddAlbum);
    selectAlbum.addEventListener('change', handleSelectAlbum);
    newSlide.addEventListener('click', handleNewSlideClick);
    btnSaveSlide.addEventListener("click", handleSaveSlide);
    saveAlbum.addEventListener("click", saveToStorage);
    deleteAlbum.addEventListener("click", handleDeleteAlbum);
    exportAlbum.addEventListener("click", handleExportAlbum);
    importAlbum.addEventListener("click", function () {
        uploadFile.click();
    })
    uploadFile.addEventListener("change", handleImportFile)
    playAlbum.addEventListener("click" , handlePlayAlbum);




    function handleImportFile() {
        if (selectAlbum.value == "-1") {
            alert("Please Select an Album");
            return;
        }

        let file = window.event.target.files[0];
        let reader = new FileReader();

        reader.addEventListener("load", function () {
            let data = window.event.target.result;
            let importedAlbum = JSON.parse(data);

            let album = albums.find(a => a.name == selectAlbum.value);
            album.slides = album.slides.concat(importedAlbum.slides);

            slideList.innerHTML = "";
            for (let i = 0; i < album.slides.length; i++) {

                let slideTemplate = allTemplates.content.querySelector(".slide");
                let slide = document.importNode(slideTemplate, true)

                slide.querySelector(".title").innerHTML = album.slides[i].title;
                slide.querySelector(".desc").innerHTML = album.slides[i].desc;
                slide.querySelector("img").setAttribute("src", album.slides[i].url);
                slide.addEventListener("click", handleSlideClick);

                album.slides[i].selected = false;
                slideList.append(slide);
            }
        });
        reader.readAsText(file);
    }

    function handleAddAlbum() {
        let albumName = prompt("Enter a name for the new album");
        if (albumName == null) {
            return;
        }

        albumName = albumName.trim();
        if (!albumName) {
            alert("Empty name not allowed");
            return;
        }

        let exists = albums.some(a => a.name == albumName);
        if (exists) {
            alert(albumName + " already exists. Please use a unique new name");
            return;
        }

        let album = {
            name: albumName,
            slides: []
        };
        albums.push(album);

        let optionTemplate = allTemplates.content.querySelector("[purpose=new-album]");
        let newAlbumOption = document.importNode(optionTemplate, true);

        newAlbumOption.setAttribute("value", albumName);
        newAlbumOption.innerHTML = albumName;
        selectAlbum.appendChild(newAlbumOption);

        selectAlbum.value = albumName;
        selectAlbum.dispatchEvent(new Event("change"));
    }

    function handleSelectAlbum() {
        if (this.value == "-1") {
            overlay.style.display = "block";
            contentDetailsOverlay.style.display = "none";
            createSlide.style.display = "none";
            showSlide.style.display = "none";
            slideList.innerHTML = "";
        } else {
            overlay.style.display = "none";
            contentDetailsOverlay.style.display = "block";
            createSlide.style.display = "none";
            showSlide.style.display = "none";


            let album = albums.find(a => a.name == selectAlbum.value);
            slideList.innerHTML = "";
            for (let i = 0; i < album.slides.length; i++) {

                let slideTemplate = allTemplates.content.querySelector(".slide");
                let slide = document.importNode(slideTemplate, true)

                slide.querySelector(".title").innerHTML = album.slides[i].title;
                slide.querySelector(".desc").innerHTML = album.slides[i].desc;
                slide.querySelector("img").setAttribute("src", album.slides[i].url);
                slide.addEventListener("click", handleSlideClick);

                album.slides[i].selected = false;
                slideList.append(slide);

            }
        }
    }

    function handlePlayAlbum(){
        if (selectAlbum.value == "-1") {
            alert("Please Select an Album");
            return;
        }
        playOverlay.style.display= "block";  
        let album = albums.find(a => a.name == selectAlbum.value);  
        playOverlay.querySelector("#text").innerHTML = "Playing a album " + (album.name);
        
        let counter = album.slides.length;
        let i = 0;
        let id = setInterval(function () {
            slideList.children[i].click();
            
            
            i++;
            if(i == counter){
                clearInterval(id);
                playOverlay.style.display= "none";  
                
            }
            
        }, 1000)

    }
    function handleDeleteAlbum() {
        if (selectAlbum.value == "-1") {
            alert("Please Select an Album");
            return;
        }

        let aidx = albums.findIndex(a => a.name == selectAlbum.value);
        albums.splice(aidx, 1);

        selectAlbum.remove(selectAlbum.selectedIndex);

        selectAlbum.value = "-1";
        selectAlbum.dispatchEvent(new Event("change"));


    }


    function handleNewSlideClick() {
        overlay.style.display = "none";
        contentDetailsOverlay.style.display = "none";
        createSlide.style.display = "block";
        showSlide.style.display = "none";

        txtSlideUrl.value = "";
        txtSlideTitle.value = "";
        txtSlideDesc.value = "";

        btnSaveSlide.setAttribute("purpose", "create");
    }

    function handleSaveSlide() {
        let url = txtSlideUrl.value;
        let title = txtSlideTitle.value;
        let desc = txtSlideDesc.value;

        if (this.getAttribute("purpose") == "create") {


            let slideAllTemplate = allTemplates.content.querySelector(".slide");
            let slide = document.importNode(slideAllTemplate, true);
            /*myyyyy editttt of codeeeee**************************************---------- */
            if (!title || !url || !desc) {
                alert("please");
                return;
            }
            else {
                slide.querySelector(".title").innerHTML = title;
                slide.querySelector(".desc").innerHTML = desc;
                slide.querySelector("img").setAttribute("src", url);
            }
            /*myyyyy editttt  of codeeeee is doneee**************************************---------- */
            slide.addEventListener("click", handleSlideClick);

            slideList.append(slide);

            let album = albums.find(a => a.name == selectAlbum.value);
            album.slides.push({
                title: title,
                url: url,
                desc: desc
            })
            slide.dispatchEvent(new Event("click"));
        } else {

            let album = albums.find(a => a.name == selectAlbum.value);
            let slideToUpdate = album.slides.find(s => s.selected == true);


            let slideDivToUpdate;
            for (let i = 0; i < slideList.children.length; i++) {
                let slideDiv = slideList.children[i];
                if (slideDiv.querySelector(".title").innerHTML == slideToUpdate.title) {
                    slideDivToUpdate = slideDiv;
                    break;
                }

            }
            slideToUpdate.title = title;
            slideToUpdate.desc = desc;
            slideToUpdate.url = url;

            slideDivToUpdate.querySelector(".title").innerHTML = title;
            slideDivToUpdate.querySelector(".desc").innerHTML = desc;
            slideDivToUpdate.querySelector("img").setAttribute('src', url);

            slideDivToUpdate.dispatchEvent(new Event("click"));
            alert("Edited. Click Okay to See the Updated new slide");

        }
    }

    function handleSlideClick() {
        overlay.style.display = "none";
        contentDetailsOverlay.style.display = "none";
        createSlide.style.display = "none";
        showSlide.style.display = "block";

        showSlide.innerHTML = "";

        let slideInViewTemplate = allTemplates.content.querySelector(".slide-in-view");
        let slideinView = document.importNode(slideInViewTemplate, true);

        slideinView.querySelector(".title").innerHTML = this.querySelector(".title").innerHTML;
        slideinView.querySelector(".desc").innerHTML = this.querySelector(".desc").innerHTML;
        slideinView.querySelector("img").setAttribute("src", this.querySelector("img").getAttribute("src"));
        slideinView.querySelector("[purpose = edit]").addEventListener("click", handleEditSlide);
        slideinView.querySelector("[purpose = delete]").addEventListener("click", handleDeleteSlide);

        showSlide.append(slideinView);

        let album = albums.find(a => a.name == selectAlbum.value)
        for (let i = 0; i < album.slides.length; i++) {
            if (album.slides[i].title == this.querySelector(".title").innerHTML) {
                album.slides[i].selected = true;
            }
            else {
                album.slides[i].selected = false;
            }

        }
    }

    function handleEditSlide() {
        overlay.style.display = "none";
        contentDetailsOverlay.style.display = "none";
        createSlide.style.display = "block";
        showSlide.style.display = "none";

        let album = albums.find(a => a.name == selectAlbum.value);
        let slide = album.slides.find(s => s.selected == true)

        txtSlideUrl.value = slide.url;
        txtSlideTitle.value = slide.title;
        txtSlideDesc.value = slide.desc;

        btnSaveSlide.setAttribute("purpose", "update");

    }

    function handleDeleteSlide() {
        let album = albums.find(a => a.name == selectAlbum.value);
        let sidx = album.slides.findIndex(s => s.selected == true);

        let slideDivTBD;
        for (let i = 0; i < slideList.children.length; i++) {
            let slideDiv = slideList.children[i];
            if (slideDiv.querySelector(".title").innerHTML == album.slides[sidx].title) {
                slideDivTBD = slideDiv;
                break;
            }
        }
        slideList.removeChild(slideDivTBD);
        album.slides.splice(sidx, 1);

        overlay.style.display = "none";
        contentDetailsOverlay.style.display = "block";
        createSlide.style.display = "none";
        showSlide.style.display = "none";
    }

    function handleExportAlbum() {
        if (selectAlbum.value == "-1") {
            alert("Please Select an Album");
            return;
        }

        let album = albums.find(a => a.name == selectAlbum.value);
        let ajson = JSON.stringify(album);
        let encodedJson = encodeURIComponent(ajson);

        let a = document.createElement("a");
        a.setAttribute("download", album.name + ".json");
        a.setAttribute("href", "data:text/json; charset=utf-8," + encodedJson);

        a.click();
    }

    function saveToStorage() {
        let json = JSON.stringify(albums);
        localStorage.setItem("data", json);
        alert("Saved in Local Storage");
    }

    function loadFromLocalStorage() {
        let json = localStorage.getItem("data");
        if (!json) {
            return;
        }

        albums = JSON.parse(json);
        for (let i = 0; i < albums.length; i++) {
            let optionTemplate = allTemplates.content.querySelector("[purpose=new-album]");
            let newAlbumOption = document.importNode(optionTemplate, true);

            newAlbumOption.setAttribute("value", albums[i].name);
            newAlbumOption.innerHTML = albums[i].name;
            selectAlbum.appendChild(newAlbumOption);
        }

        selectAlbum.value = "-1";
    }

    loadFromLocalStorage();






})();
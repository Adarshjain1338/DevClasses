(function () {
    let saveAlbum = document.querySelector("#saveAlbum");
    let addAlbum = document.querySelector("#addAlbum");
    let removeAlbum = document.querySelector("#removeAlbum");
    let importAlbum = document.querySelector("#importAlbum");
    let exportAlbum = document.querySelector("#exportAlbum");
    let playAlbum = document.querySelector("#playAlbum");
    let selectAlbum = document.querySelector("#selectAlbum");
    let allTemplates = document.querySelector("#allTemplates");
    let overlay = document.querySelector("#overlay");
    let contentDetailsOverlay = document.querySelector("#contentDetailsOverlay");
    let newSlide = document.querySelector("#new-slide");
    let createSlide = document.querySelector("#create-slide");
    let showSlide = document.querySelector("#show-slide");
    
    let albums = [{
        name: "test",
        images: []
    }];

    addAlbum.addEventListener('click', handleAddAlbum);
    selectAlbum.addEventListener('change', handleSelectAlbum);
    newSlide.addEventListener('click', handleNewSlideClick);

    function handleAddAlbum() {
        let albumName = prompt("Enter Name of new Album");
        if (albumName == null) {
            return;
        }
        albumName = albumName.trim();
        if (!albumName) {
            alert("Empty is not allowed");
            return;
        }
        let exists = albums.some(a => a.name == albumName);
        if (exists) {
            alert(albumName + " is alerady exists, Please enter a unique name");
            return;
        }
        let album = {
            name: albumName,
            images: []
        }
        albums.push(album);
        
        let optionTemplate = allTemplates.content.querySelector("[purpose = 'new-album']");
        let newAlbumOption = document.importNode(optionTemplate, true);

        newAlbumOption.setAttribute("value", albumName);
        newAlbumOption.innerHTML = albumName;
        selectAlbum.appendChild(newAlbumOption);

        selectAlbum.value = albumName;
        selectAlbum.dispatchEvent(new Event("change"));

    }

    function handleSelectAlbum() {
        if(this.value =="-1"){
            overlay.style.display="block";
            contentDetailsOverlay.style.display = "none";
            createSlide.style.display= "none";
        }else{
            overlay.style.display="none";
            contentDetailsOverlay.style.display = "block";
            createSlide.style.display= "none";
        }
        
    }

    function handleNewSlideClick(){
        overlay.style.display="none";
        contentDetailsOverlay.style.display = "none";
        createSlide.style.display= "block";
    }








})();
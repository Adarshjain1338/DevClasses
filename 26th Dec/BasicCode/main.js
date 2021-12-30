
(function(){
    let btn = document.querySelector("#firstbtn");  // here we selected button with our button id that is firstbtn.
    let containerdiv = document.querySelector("#container");  //container selected
    let MyTemplate = document.querySelector("#MyTemplate");   // Template selected


    // here we added some feature when we click our firstbtn. using addEventListener.
    btn.addEventListener("click", function () {
        let FolderName = prompt("Enter Your Folder's Name !"); // prompt key word use in when we want input from user.
        // if we leave the blank prompt then it will return and do nothing 
        if(FolderName == null){
            return;
        }
        // if you want to access a template then you have to do it like that ... 
        // template(where you catched the template in variable).content(when you want to access template).querySelector{for selection purpose}(".folder")
        let foldertemplatediv = MyTemplate.content.querySelector(".folder");
        let divfolder = document.importNode(foldertemplatediv , true); // when you want to access the content of template and copy in another variable you have to pass boolean with {want deep copy of anything} 
        
        let divName = divfolder.querySelector("[purpose='name']"); // we selected the name using square bracket that focus on attribut(here is purpose is attribute)

        divName.innerHTML = FolderName; // here we adding name that prompt (user provides us ) in div>div>'[purpose = "name"]';
        containerdiv.appendChild(divfolder); // and adding whole new edited folder again .
    })
    
})();


// Getting elements from document
const inpFile = document.getElementById("inpFile");
const previewContainer = document.getElementById("imagePreview");
const previewImage = previewContainer.querySelector(".imagePreview");

inpFile.addEventListener("change", function() {
    // this gives files "list"
    const file = this.files[0];

    if(file) {
        // reading file as a DataURL
        const reader = new FileReader();

        previewImage.style.display = "block";
        reader.addEventListener("load", function() {
            // "this" refer to a FileReader
            previewImage.setAttribute("src", this.result);
        });
        reader.readAsDataURL(file);
    }
    // if user chooses not to choose any file
    else {
        previewImage.style.display = null;
    }
});
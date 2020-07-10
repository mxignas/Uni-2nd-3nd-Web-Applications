//Import the express and body-parser modules
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

//Create express app's and configure it with body-parser and file upload
const app = express();
app.use(bodyParser.json());
app.use(fileUpload());

//Set up express to serve static files from the directory called 'public'
app.use(express.static('public'));

//Data structure that will be accessed using the web service
let recipeArray = [];

//Set up application to handle GET requests sent to the recipe path
app.get('/recipes/*', handleGetRequest);//Returns recipe with specified ID
app.get('/recipes', handleGetRequest);//Returns all recipes

//Set up application to handle POST requests sent to the recipe path
app.post('/recipes', handlePostRequest);//Adds a new recipe




////////////////////////// FOR UPLAODING A FILE /////////////////////////////////////

//Handle POST requests sent to /upload path
app.post('/upload', function(req, res) {
    //Check to see if a file has been submitted on this path
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "inpFile") is used to retrieve the uploaded file
    let myImageFile = req.files.inpFile;
    //CHECK THAT IT IS AN IMAGE FILE, NOT AN .EXE ETC.

    /* Use the mv() method to place the file in the folder called 'uploads' on the server.
        This is in the current directory */
    myImageFile.mv('./uploads/' + myImageFile.name, function(err) {
        if (err)
            return res.status(500).send(err);

        //Send back confirmation of the upload to the client.
        console.log("succesfull")
  });
});
////////////////////////// FOR UPLAODING A FILE /////////////////////////////////////




//Start the app listening on port 8080
app.listen(8080);

//Handles GET requests to our web service
function handleGetRequest(request, response){
    //Split the path of the request into its components
    var pathArray = request.url.split("/");

    //Get the last part of the path
    var pathEnd = pathArray[pathArray.length - 1];

    //If path ends with 'recipes' we return all recipes
    if(pathEnd === 'recipes'){
        response.send(recipeArray);
    }

    //If the last part of the path is a valid user id, return data about that user
    else if(pathEnd in recipeArray){
        response.send(recipeArray[pathEnd]);
    }

    //The path is not recognized. Return an error message
    else
        response.send("{error: 'Path not recognized'}");
}

//Handles POST requests to our web service
function handlePostRequest(request, response){
    //Output the data sent to the server
    let newRecipe = request.body;
    console.log("Data received: " + JSON.stringify(newRecipe));

    //Add user to our data structure
    recipeArray.push(newRecipe);

    //Finish off the interaction.
    response.send("Recipe added successfully.");
}




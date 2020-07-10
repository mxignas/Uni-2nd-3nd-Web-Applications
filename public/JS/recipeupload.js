//Points to a div element where recipe combo will be inserted.
let mainRecipeDiv;
let addRecipeResultDiv;
let viewRecipeDiv;

//Set up page when window has loaded
window.onload = init;

//Get pointers to parts of the DOM after the page has loaded.
function init(){
    mainRecipeDiv = document.getElementById("newRecipe");
    addRecipeResultDiv = document.getElementById("addRecipeResult");
    viewRecipeDiv = document.getElementById("viewRecipes");
    loadRecipe();
}

/* Loads current recipes and adds them to the page. */
function loadRecipe() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {//Called when data returns from server
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //Convert JSON to a JavaScript object
            let rcpArr = JSON.parse(xhttp.responseText);

            //Return if no recipes
            if(rcpArr.length === 0)
                return;

            //Build string with user data
            let htmlStr = "";
            let viewHtmlStr = "";
            //let sqlRcp = "";

            for(let key in rcpArr){

                // inserting recipe in main page
                htmlStr += ('<div class="cell_1"> <a href="#" data-target="recipe' + key + '"class="nav-link"> <img class="mainPic"' +
                 ' src="../uploads/' + rcpArr[key].img + '"> </a> </div>' + '<div class="cell_2"> <h2>' + rcpArr[key].rcpName + ' </h2> <p class="description">' +
                  rcpArr[key].rcpDescrip + '</p>' + '<div class="iconsDiv"> <p class="icons"><img src="https://img.icons8.com/pastel-glyph/40/000000/time.png"/> Time to make:' +
                  rcpArr[key].totalTime + ' mins </p>' + '<p class="icons"><img src="https://img.icons8.com/dotty/40/000000/money.png"/> Costs: ' +
                  rcpArr[key].rcpCost + '£</p> </div> </div> <hr>');

                  // to view recipe when clicked on the picture of it
                viewHtmlStr += ('<div class="page" id="recipe' + key + '"> <div id="mainPicView"> <img id="picView" src="./pictures/new.jpg"> <br><br>' +
                '<div id="rcpInfo"> <h3> Recipe Information:</h3> <textarea  id="NameView" cols="30">' + rcpArr[key].rcpName + '</textarea> <br> <br>' +
                '<textarea id="prepView" cols="30">Preparation time:' + rcpArr[key].rcpPrep + 'min</textarea> <br><br> <textarea id="cookView" cols="30">Cooking time:' + rcpArr[key].rcpCook + 'min</textarea> <br><br>' +
                '<textarea id="cookView" cols="30">Cooking time:' + rcpArr[key].rcpCook + 'min</textarea> <br><br> <textarea id="costView" cols="30">Costs: ' + rcpArr[key].rcpCost + '£</textarea><br><br>' + 
                '<textarea id="categoryView" cols="30">' + rcpArr[key].rcpCateg + '</textarea><br><br> <textarea id="ownerView" cols="30">Owner: ' +  rcpArr[key].usrName + '</textarea><br><br></br> </div></div>' +
                '<div id="description-ingridients"> <textarea name="descripView" id="descripView" cols="40" rows="10">' + rcpArr[key].rcpDescrip + '</textarea> <br><br>' +
                '<textarea name="ingridientView" id="ingridientView" cols="40" rows="20">' + rcpArr[key].rcpIngrid + '</textarea></div>' +
                '<div id="steps"> <textarea name="stepsView" id="stepsView" cols="60" rows="20">' + rcpArr[key].rcpSteps + '</textarea></div></div>');

            }
            mainRecipeDiv.innerHTML = htmlStr;
            viewRecipeDiv.innerHTML = viewHtmlStr; 

        }
    };


    //Request data from all recipes
    xhttp.open("GET", "/recipes", true);
    xhttp.send();
}


/* Posts a new user to the server. */
function addRecipe() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract recipe creation page data
    let rcpImg = document.getElementById("inpFile").files[0].name;
    let ownerName = document.getElementById("firstNameCreate").value;
    let ownerSurname = document.getElementById("lastNameCreate").value;
    let recipeName = document.getElementById("NameCreate").value;
    let preparationTime = document.getElementById("prepCreate").value;
    let cookingTime = document.getElementById("cookCreate").value;
    let costToCreate = document.getElementById("costCreate").value;
    let mealCategory = document.getElementById("mealCategory").value;
    let mealDescription = document.getElementById("descripCreate").value;
    let stepsToCreate = document.getElementById("stepsCreate").value;
    let ingridientsToCreate = document.getElementById("ingridientCreate").value;

    // to get total time for a meal
    let cookTimeString = document.getElementById("cookCreate").value;
    let prepTimeString = document.getElementById("prepCreate").value;
    let cookTimeInt = parseInt(cookTimeString);
    let prepTimeInt = parseInt(prepTimeString);
    let TotalTimeToMake = cookTimeInt + prepTimeInt;



    //Create object with recipe data
    let rcpObj = {
        img : rcpImg,
        usrName: ownerName,
        usrSurname: ownerSurname,
        rcpName : recipeName,
        rcpPrep : preparationTime,
        rcpCook : cookingTime,
        rcpCost : costToCreate,
        rcpCateg : mealCategory,
        rcpDescrip : mealDescription,
        rcpSteps : stepsToCreate,
        rcpIngrid : ingridientsToCreate,
        totalTime : TotalTimeToMake,
    };
    
    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            addRecipeResultDiv.innerHTML = "Recipe added successfully";
        }
        else{
            addRecipeResultDiv.innerHTML = "<span style='color: red'>Error adding recipe</span>.";
        }
        //Refresh list of users
        loadRecipe();
    };

    //Send new user data to server
    xhttp.open("POST", "/recipes", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send( JSON.stringify(rcpObj) );
}
 
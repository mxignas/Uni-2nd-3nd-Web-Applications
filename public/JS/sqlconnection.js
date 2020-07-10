//Import the mysql module
const mysql = require('mysql');

//Create a connection pool with the user details
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "mxignas",
    password: "123",
    database: "recipe",
    debug: false
});


//Build query
sqlRcp += ('INSERT INTO recipe (Name, Prep_Time, Cook_Time, Price, Description, Recipe_Owner, Category_ID) VALUES ("test1", "10", "15", "20", "test1", "test1", "test1", "1")');

//Execute query and output results
connectionPool.query(sqlRcp, (err, result) => {
    if (err){//Check for errors
        console.error("Error executing query: " + JSON.stringify(err));
    }
    else{
        console.log(JSON.stringify(result));
    }
});




var http = require("http");
var mysql = require("./mysql");

var resultsArray;
var tab1 = "   ";
var tab2 = "      ";
var tab3 = "         ";
var tab4 = "            ";
var tab5 = "               ";
var uneditedVar = "      {\r\n         \"category\":\"**\",\r\n         \"productName\":\"THE WORKSHOP MYSQL MICROSERVICE SERVER.JS CODE HAS NOT BEEN EDITED.\",\r\n" +
    "         \"twitterTag\":\"**\"\r\n      }\r\n   ]\r\n}\r\n";

// USE THE MYSQL NODE.JS CODE LOCATED IN THE MYSQL SUBFOLDER TO CREATE A CONNECTION OBJECT WITH APPROPRIATE VALUES FOR CONNECTING TO THE MYSQL DB IN THE ORACLE CLOUD SERVICE.

/*********************************************************    
CHANGE THE MYSQL CONNECTION PARMETERS BELOW FOR THE WORKSHOP - THIS WILL VARY BY WORKSHOP.    
*********************************************************/ 
var connection = mysql.createConnection({
    host     : '141.145.24.235',
    port     : '1521',
    user     : 'root',
    password : 'flUEnt@0Fate',
    database : 'AlphaofficeDB'
});
/*********************************************************    
CHANGE THE MYSQL CONNECTION PARMETERS ABOVE FOR THE WORKSHOP.    
*********************************************************/ 

// PERFORM A QUERY USING THE SYNTAX IN THE SQLVAR VARIABLE.  THE RESULTING ROWS WILL BE WRITTEN TO THE RESULTSARRAY ARRAY.
connection.connect();
var sqlVar = "SELECT c.category_name, p.product_name, p.twitter_tag FROM `PRODUCTS` AS p INNER JOIN `PRODUCT_CATEGORIES` AS c ON c.category_id = p.category_id ORDER BY c.category_name, p.product_name";
connection.query(sqlVar, function (error, results, fields) {
    if (error){
        console.log(error);
    }
    resultsArray = results;
});
connection.end();

// GENERATE AND RETURN A JSON STRING (LIKE A FILE) USING ROW VALUES SELECTED FROM THE DATABASE.
http.createServer(function(request, response) {
response.writeHead(200, {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Content-Type': 'application/json'
});
    // GENERATE RETURN JSON OBJECT.
    response.write("{\r\n");
    response.write(tab1 + "\"products\":[\r\n");
    /*********************************************************    
    UNCOMMENT THE CODE SECTION BELOW FOR THE WORKSHOP - THIS SECTION ASSEMBLES AND RETURNS THE DATABASE PRODUCT DATA.      
    *********************************************************/  
    /*
    uneditedVar = "";
    for (var i in resultsArray) {
        if (i > 0) {
            response.write(tab2 + "},\r\n");          
        }
        response.write(tab2 + "{\r\n");  
        response.write(tab3 + "\"category\":\"" + cleanseValues(resultsArray[i].category_name)   + "\",\r\n");  
        response.write(tab3 + "\"productName\":\"" + cleanseValues(resultsArray[i].product_name)  + "\",\r\n");  
        response.write(tab3 + "\"twitterTag\":\"" + cleanseValues(resultsArray[i].twitter_tag)  + "\"\r\n");    
    }
    response.write(tab2 + "}\r\n");  
    response.write(tab1 + "]\r\n"); 
    response.write("}\r\n");  
    */
    /*********************************************************    
    UNCOMMENT THE CODE SECTION ABOVE FOR THE WORKSHOP.    
    *********************************************************/
    response.write(uneditedVar); // DOES NOTHING IF SECTION ABOVE IS UNCOMMENTED       
    response.end();
}).listen(process.env.PORT || 8002);

// REMOVE ANY NON-DISPLAYABLE CHARACTERS.
function cleanseValues(textParm) {
    var textVar = textParm;
    textVar = textVar.replace(/"/g, '\"');
    textVar = textVar.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '')
    return textVar;
}


 

var database = require('../database/database');
var query = require('../query');
var express = require('express');
var router = express.Router();






 var userData = ['Aqui oh', 'aqui mesmo', 1, 1];  
database.connection.connect(function(err)
{
    if(err) {
        console.log("Not Connected!");
    } 

    else
    {
        console.log(" Connected!");
        database.connection.query(query.insertSolicitGrupo(5, 1 ,0), function(err, result, fields) 
        {
        
            if (err) 
            {
                console.log("Not Connected! 2");
     
            } 

            else 
            {             
                 console.log(" Connected! 2");
                 console.log(result);
                 //console.log("Number of records inserted: " + result.affectedRows);
            }
            
            database.connection.end();

        });
    }
});

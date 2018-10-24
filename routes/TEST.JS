var database = require('../database/database');
var query = require('../query');
var express = require('express');
var router = express.Router();







 
database.connection.connect(function(err)
{
    if(err) {
        console.log("Not Connected!");
    } 

    else
    {
        console.log(" Connected!");
        
        database.connection.query(query.findMyFriends(1), function(err, result) 
        {           
           if(!err) {
                        console.log("Deu certo");
                        console.log(result);

                    }
   
                    
        });
    }
});

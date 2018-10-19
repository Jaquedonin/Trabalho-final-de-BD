var database = require('../database/database');
var query = require('../query');
var express = require('express');
var router = express.Router();






 var data = ['Bozo never', 'Brasília — O PT entrou com um pedido para que a Polícia Federal investigue a suspeita de práticas ilícitas no uso de redes sociais por parte da campanha do candidato do PSL à Presidência, Jair Bolsonaro, incluindo denúncia de que empresas estariam pagando pelo envio de mensagens em defesa do candidato.', 1];  
database.connection.connect(function(err)
{
    if(err) {
        console.log("Not Connected!");
    } 

    else
    {
        console.log(" Connected!");
        database.connection.query(query.insertPostText(data), function(err, result, fields) 
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

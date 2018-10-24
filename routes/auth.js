var express = require('express');
var database = require('../database/database');
var auth = express.Router();
var query = require('../query');
var cors = require('cors')
var jwt = require('jsonwebtoken');

var token;
var user;
auth.use(cors());

process.env.SECRET_KEY = "devesh";




auth.post('/register', function(req, res)
 {    
    var userData = [req.body.nome, req.body.cidade, req.body.email, req.body.senha];
    database.connection.connect(function(err)
    {
        if(err) 
        {
            res.status(500).json({ error: 1, data: "Internal Server Error"});

        }
        
        else 
        {
            database.connection.query(query.insertUser(userData), function(err, rows, fields) 
            {
            
                if (err) 
                {
                    res.status(400).json({ error: 1, data: "Error Occured!"});
                } 

                else 
                {             
                    //res.status(201).json({ error: 0, data: "User registered successfully!"});
                    return res.redirect('/auth');
                }
                
                database.connection.end();

            });
        }
    });
});

auth.get('/logout', function(req, res) {
    req.session.token = false;
    req.session.user = false;
    return res.redirect('/');
});

auth.post('/login', function(req, res) {

    var email = req.body.email;
    var senha = req.body.senha;
 
    database.connection.query(query.findLogin(email, senha), function(err, rows, fields) {
        
        if (err) {
            res.status(400).json({
                error: 1,
                data: "Error occured!",
                err: err
            });
        } 

        else 
        {
            
            if (rows.length > 0) 
            {
                console.log("Dentro de login");
                if (rows[0].senha == senha) 
                {
                  console.log("testando senha");  
                   var userId = rows[0].id;
                    var payload = JSON.parse(JSON.stringify(rows[0]));
                    var token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    });
                    req.session.user = true;
                    req.session.token = token;
                    req.session.userId = userId;     
                    return res.redirect('/dashboard');
                } 

                else 
                {
                    console.log("senha errada"); 
                    res.status(204).json({
                        error: 1,
                        data: 'Email and Password does not match'
                    });
                }

            } else 
            {
                console.log("senha e email errada"); 
                res.status(204).json({
                    error: 1,
                    data: 'Email does not exists!'
                });
            }
        }
    });
});

auth.get('/getUsers', function(req, res) {

    var appData = {};

    database.connection.getConnection(function(err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query('SELECT * FROM cidades', function(err, rows, fields) {
                if (!err) {
                    appData["error"] = 0;
                    appData["data"] = rows;
                    res.status(200).json(appData);
                } else {
                    appData["data"] = "No data found";
                    res.status(204).json(appData);
                }
            });
            connection.release();
        }
    });
});

module.exports = auth;
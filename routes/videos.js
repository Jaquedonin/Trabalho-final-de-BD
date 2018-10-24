var database = require('../database/database');
var query = require('../query');
var express = require('express');
var router = express.Router();
var functions = require('../include/functions')

//inserir videos
router.get('/postagens', function(req, res, next) {
	//variables to test url Facebook and Youtube
	if(req.session.userId === undefined){
		console.log("redirect login")
		return res.redirect('/auth');
	} 

	database.connection.query(query.findMyP(req.session.userId), function(err, result) 
    {     
       if(!err) 
       {
            console.log("Encontrou postagens");
            data.postagens = result;
            res.render('dashboard', data);

        }                      
    });
});


router.post('/delete/videos', function(req, res, next) {
	if(req.body.id === undefined){
		console.log("req.body.id UNDEFINED");
		return false;}
	else{
		database.connection.query(query.deleteOne("videos", req.body.id), function (err, result) {
			if(err){
				res.setHeader('Content-Type', 'application/json');
				return res.status(400).send(err);
			}
			else{
				return res.redirect('/dashboard');
			}
		});
	}
});

router.get('/amigos', function(req, res, next) {	
	if(req.session.userId === undefined){
		console.log("redirect login")
		return res.redirect('/auth');
	}
	else{
		console.log(req.session.userId)
		database.connection.query(query.findMyFriends(req.session.userId), function (err, result) {
			if(err){
				res.setHeader('Content-Type', 'application/json');
				return res.status(400).send(err);
			}
			else{
				res.setHeader('Content-Type', 'application/json');
				res.json(result);
				res.end('amigos');

			}
		}); 	
	}
});


module.exports = router;

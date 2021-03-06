
var express = require('express');
var router = express.Router();
var favicon = require('serve-favicon')
var database = require('../database/database');
var query = require('../query');
var fs = require('fs');
var path = require('path')
var data = JSON.parse(fs.readFileSync('./database/data.json', 'utf8'));


var app = express()
app.use(favicon(path.join('./public/images/mario.ico')))

/* GET home page. */
router.get('/', function(req, res, next) {
    
    data.user = req.session.user;
    res.render('auth', data);
   
});

router.get('/bem-vindo', function(req, res, next) {
    
    if(!req.session.user)
    {
        data.user = false;
        //data.professores = false;
        return res.redirect("/auth");
    } 
    
    data.user = req.session.user
    res.render('bem-vindo', data);
});

router.get('/galeria/:cidade/:categoria', function(req, res, next) {

    var getCidade = function (cidade,categoria){
        
        var data = {
            categoria: {
                id: categoria
            }
        }

        return new Promise(function(resolve, reject) {
            database.connection.query("SELECT * FROM cidades WHERE codigo = " + cidade, function (err, result) { 
                    if(err){
                        reject(err);
                    } else {
                        data.cidade = result[0]; 
                        resolve(data);
                    }
                }
            )
        });
    }

    //buscar videos da cidade selecionada
    var getGaleriaVideos = function(data) {
        
        var query = "SELECT videos.id, videos.url, categorias.descricao FROM videos" +
        " INNER JOIN cidades ON cidades.codigo = " + data.cidade.codigo +
        " INNER JOIN professores_escolas ON professores_escolas.id = videos.professor_escola_id" +
        " INNER JOIN escolas ON escola_id = escolas.id AND cidade_id = " + data.cidade.codigo;
        
        if(data.categoria){
            query += " INNER JOIN categorias ON categorias.id = videos.categoria_id"
            query += " WHERE categorias.id = " + data.categoria.id 
        }
        
        return new Promise(function(resolve, reject) {
            database.connection.query(query, function (err, result) { 
                    if(err){
                        reject(err);
                    } else {
                        data.categoria.descricao = result[0] ? result[0].descricao : false;
                        data.categoria.videos = result;
                        resolve(data);
                    }
                }
            )
        });
    }

    var getCategorias = function (data, categoria){

        return new Promise(function(resolve, reject) {
            database.connection.query("SELECT id, tipo FROM categorias", function (err, result) { 
                    if(err){
                        reject(err);
                    } else {
                        data.categorias = result 
                        resolve(data);
                    }
                }
            )
        });
    }

    getCidade(req.params.cidade, req.params.categoria).then(function(data){
        getGaleriaVideos(data).then(function(data){
            getCategorias(data).then(function(data){
                res.render('galeria', data);
            });
        });
    })

    
});

router.post('/api/cidades', function(req, res, next){
    database.connection.query(
        "SELECT codigo as 'value', nome as 'label' FROM cidades WHERE nome LIKE '%"+ req.body.term + "%'", 
        function (err, result) {       
        data.cidades = !err ? result : false;
        res.json(result);
    });
});

router.post('/register', function(req, res, next){

    var userData = 
    {
        fbUser: req.body["fb-register-user"], 
        email: req.body.email,
        senha: req.body.senha
    };

    database.connection.connect(function(err){
        
        if(err) 
        {

            res.status(500).json({
                error: 1,
                data: "Internal Server Error"
            });

        } 

        else 
        {
            database.connection.query(
                'INSERT INTO professores SET ?', 
                [userData], 
                function(err, rows, fields) 
                {
                
                    if (err) 
                    {
                        res.status(400).json({
                            error: 1,
                            data: "Error Occured!"
                        });
                    } 

                    else 
                    {             
                        res.status(201).json({
                            error: 0,
                            data: "User registered successfully!" 
                        });
                    }
                
                    database.connection.end();
                }
            );
        }
    });
});

router.get('/dashboard', function(req, res, next) {
    console.log("Dentro de dashboard"); 
    if(!req.session.token)
    {
        return res.redirect("/auth");
    }
    data.user = req.session.user;
    data.user = true;

    //Pegando dados do usuário logado
    database.connection.query(query.findEvery( 'usuario', req.session.userId), function (err, result) 
    {
        if(!err)
        {
            data.usuario = result;


            //res.render('dashboard', data);
             //Pegando postagens
            database.connection.query(query.findMyP(req.session.userId), function(err, result) 
            {     
               if(!err) 
               {
                    console.log("Encontrou postagens");
                    data.postagens = result;
                    //data.postagens = result;
                    //res.render('dashboard', data);
                    database.connection.query(query.findMyGroups(req.session.userId, 1), function(err, result) 
                    {     
                       if(!err) 
                       {
                            console.log("Encontrou grupos");
                            data.grupos = result;
                            //data.postagens = result;
                            //es.render('dashboard', data);
                            database.connection.query(query.findMyFriends(req.session.userId), function(err, result) 
                            {     
                               if(!err) 
                               {
                                    console.log("Encontrou amigos");
                                    data.amizades = result;
                                    //data.postagens = result;
                                    res.render('dashboard', data);
                                }                      
                            });
                        }                      
                    });
                }                      
            });          
        }

        else
        {
            console.log(err);
        }
        var postData;
        database.connection.query(query.findOne(req.session.userId), function(err, result) 
        {
            console.log(result);
            for (var i = 0;  i < result.length; i++) 
               {    
                    var id_post = result[i].id_postagem;
                     database.connection.query(query.findEvery('postagem',id_post), function(err, result, fields) 
                        {
                    
                            if (err) 
                                {
                                    console.log("Not Connected! 2");
                                } 

                            else 
                            {             
                                 console.log(" Connected! 2");
                                 console.log(result);
                                 postData +=result;
                            }
                        });
                }
        });   
    });
    

});

router.get('/auth', function(req, res, next) {
    res.render('auth');
});

router.post('/galeria', function(req, res)
{
    var codigo = req.body.cidade;

    //buscar cidade selecionada  e suas estatisticas
    var getCidadeInfo = function(codigo, index, data) {
        return new Promise(function(resolve, reject) {
            database.connection.query(
                "SELECT group_concat(distinct cidades.nome) as nome, count(distinct escolas.id) as escolas, count(distinct professores_escolas.id) as colaboradores FROM cidades" +
                " LEFT JOIN escolas ON cidade_id = cidades.codigo" +
                " LEFT JOIN professores_escolas ON escola_id = escolas.id" +
                " WHERE cidades.codigo = " + codigo
                , function (err, result) { 
                    if(err){
                        reject(err);
                    } else {
                        data = {
                            cidade: {
                                codigo: codigo,
                                nome: result[0].nome,
                            },
                            colaboradores: result[0].colaboradores,
                            escolas: result[0].escolas
                        }
                        resolve(data);
                    }
                }
            )
        });
    }
    
    //buscar videos da cidade selecionada
    var getCidadeVideos = function(codigo, data) {
        return new Promise(function(resolve, reject) {
            database.connection.query(
                "SELECT * FROM videos" +
                " INNER JOIN professores_escolas ON professores_escolas.id = videos.professor_escola_id" +
                " INNER JOIN escolas ON escola_id = escolas.id AND cidade_id = " + codigo     
                , function (err, result) { 
                    if(err){
                        reject(err);
                    } else {
                        data.videos = result;
                        resolve(data);
                    }
                }
            )
        });
    }
    
    //buscar informacoes e retornar a pagina da galeria como resposta
    getCidadeInfo(codigo).then(function(data){
        getCidadeVideos(codigo, data).then(function(data){
            //ao final, envia a view galeria-mapa como resposta
            res.app.render('galeria-mapa', data, function(err, html){
                res.send({html:html});
            });
        });
    });
}); 

module.exports = router;

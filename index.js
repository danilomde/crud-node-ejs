const express =  require("express");

const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//Database
connection.authenticate()
.then(() =>{
    console.log("Conexão com DB"); 
})
.catch( (error) => {
    console.log(error)
})

app.set('view engine', 'ejs');
app.use( express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false,
}));

app.use(bodyParser.json());



app.get('/',(request, response) => {
    Pergunta.findAll({ 
        raw: true, 
        order: [
            [
                'id', 
                'desc'
            ]
        ]}).then( perguntas => {        
            response.render('index', { 
                perguntas: perguntas 
            });
        });
        
    });
    
    app.get("/pergunta/:id", (request, response)  => {
        var id = request.params.id;
        console.log(id);
        Pergunta.findOne({
            where: {
                id: id
            }
        }).then( pergunta => { 
            if(pergunta != undefined){
                
                Resposta.findAll({
                    where: {
                        pergunta_id: id
                    }
                }).then( respostas => {
                    response.render('pergunta', { 
                        pergunta: pergunta,
                        respostas: respostas
                    });
                });
                
                
            }else{
                response.redirect("/");
            }       
            
        })
        .catch( (erro) => {
            console.log(erro);
        } );;
    });
    
    app.get('/perguntar', (request, response)  => {
        response.render('perguntar');
    });
    
    app.post('/salvarpergunta', (request, response)  => {
        var titulo = request.body.title;
        var descricao = request.body.description;
        
        Pergunta.create({
            titulo: titulo,
            descricao: descricao
        }).then( () => {
            response.redirect("/");
        }).catch( (erro) => {
            console.log(erro);
        } );               
        
    });
    
    app.post('/responder', (request, response)  => {
        var corpo = request.body.corpo;
        var pergunta_id = request.body.pergunta_id;
        
        console.log(pergunta_id);
        
        Resposta.create({
            corpo: corpo,
            pergunta_id: pergunta_id
        }).then( () => {
            response.redirect("/pergunta/"+pergunta_id);
        }).catch( (erro) => {
            console.log(erro);
        } );               
        
    });
    
    app.listen(3000, () => { console.log('✔ Servidor Rodando') });
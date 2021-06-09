const express =  require("express");

const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

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
    
    response.render('index');
});

app.get('/perguntar', (request, response)  => {
    response.render('perguntar', {

    });
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

app.listen(3000, () => { console.log('✔ Servidor Rodando') });
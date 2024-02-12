const express = require("express");
const app = express(); 
const bodyParser = require("body-parser");
const connection = require("./database/database");

const articlesController = require("./articles/articlesController");
const categoriesController = require("./categories/categoryController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

connection.authenticate()
.then(()=>{
console.log("banco conectado com sucesso");
}).catch((error) => {
    console.log(error);
});

app.use("/", categoriesController);
app.use("/", articlesController);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.render("index");
});

app.listen(4000, ()=> {
    console.log("servidor rodando");
});

const express = require("express");
const app = express(); 
const bodyParser = require("body-parser");
const connection = require("./database/database");

//Importando Controllers
const articlesController = require("./articles/articlesController");
const categoriesController = require("./categories/categoryController");

//Importando models
const Article = require("./articles/Article");
const Category = require("./categories/Category");

connection.authenticate()
.then(()=>{
console.log("banco conectado com sucesso");
}).catch((error) => {
    console.log(error);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/", function(req, res){
    Article.findAll({
        order: [['title', 'ASC']],
        include: [{model: Category}],
    }).then((articles) => {
        res.render("index", {
            articles: articles
        });
    });
});

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    
    Article.findOne({
        where:{
            slug: slug
        }
    }).then((article) => {
        if(slug != undefined){
            res.render("article", {
                article:article
            })
        }else {
            res.redirect("/");
        }
    }).catch((error) => {
        res.redirect("/");
    })
});

app.listen(4000, ()=> {
    console.log("servidor rodando");
});

const express = require("express");
const app = express(); 
const bodyParser = require("body-parser");
const connection = require("./database/database");

//Importando Controllers
const articlesController = require("./articles/articlesController");
const categoriesController = require("./categories/categoryController");
const usersController = require("./users/UsersController");

//Importando models
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/User");

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
app.use("/", usersController);

app.get("/", function(req, res){
    Article.findAll().then((articles) => {
        Category.findAll().then((categories) => {
            res.render("index", {
                articles: articles,
                categories: categories,
            });
        });  
    })
});

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    
    Article.findOne({
        where:{
            slug: slug
        }
    }).then((article) => {
        Category.findAll().then((categories) => {
            if(slug != undefined){
                res.render("article", {
                    article:article,
                    categories:categories,
                })
            }else {
                res.redirect("/");
            }
        }).catch((error) => {
            res.redirect("/");
        })
     })
});

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;

    Category.findOne({
        where:{
            slug: slug
        }, 
        include: [{model: Article}]
    }).then((category) => {
        if(category != undefined){
            Category.findAll().then((categories) => {
                res.render("index", {
                    articles: category.articles,
                    categories: categories,
            })
        })
        }else {
            res.redirect("/");
        }
    }).catch(error => {
        res.redirect("/");
    });
});

app.listen(4000, ()=> {
    console.log("servidor rodando");
});

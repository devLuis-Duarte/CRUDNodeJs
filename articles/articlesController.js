const express = require("express");
const router = express.Router();
const Article = require("./Article");
const Category = require("../categories/Category");
const { default: slugify } = require("slugify");

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then((categories) => {
        res.render("admin/articles/new", {
            categories: categories,
        });
    })
    
});

router.post("/articles/save", (req, res) => {
   var title = req.body.title;
   var body = req.body.body;
   
   if(title != undefined && body != undefined){
    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
    }).then(() => {
        res.redirect("/admin/articles");
    });
   }else {
    res.redirect("/");
   }
});

router.get("/admin/articles/", (req, res) => {
    Article.findAll({
        order:[['title', 'ASC']]
    }).then((articles) => {
        res.render("admin/articles/index", {
            articles: articles,
        });
    })
    
});

router.post("/articles/delete", (req, res) => {
    var id = req.body.id;
    
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where:{
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            })
        }else {
            res.redirect("/admin/articles");
        }
    }else {
        res.redirect("/admin/articles");
    }
});

router.get("/admin/article/edit/:id", (req, res) => {
    var id = req.params.id;
    
    if(isNaN(id)){
        res.redirect("/admin/articles");
    }
    Article.findByPk(id).then((article) => {
        if(Article != undefined){
            res.render("admin/articles/edit", {
                article: article
            });
        }else {
            res.redirect("/admin/articles");
        }
    });
    
});

module.exports = router;
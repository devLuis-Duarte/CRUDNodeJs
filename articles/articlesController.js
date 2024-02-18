const express = require("express");
const router = express.Router();
const Article = require("./Article");
const { default: slugify } = require("slugify");

router.get("/admin/articles/new", (req, res) => {
    res.render("admin/articles/new");
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



module.exports = router;
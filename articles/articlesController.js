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
        res.redirect("/");
    });
   }else {
    res.redirect("/");
   }
});



module.exports = router;
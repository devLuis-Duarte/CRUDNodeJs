const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define('articles', {
     title:{
        type: Sequelize.STRING,
        allowNull: false,
     },

     slug: {
        type: Sequelize.STRING,
        allowNull:false,
     },

     body:{
        type: Sequelize.STRING,
        allowNull: false,
     },
});

Article.belongsTo(Category); //Um artigo pertence a uma categoria
Category.hasMany(Article); //Uma categoria têm muitos artigos

//Article.sync({force: false});

module.exports = Article;
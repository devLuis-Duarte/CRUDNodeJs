const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("./categories/models/Category");

const article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    
    slug: { //permite que palavras compostas sejam separadas por traços, como: desenvolvimento-web
        type: Sequelize.STRING,
        allowNull: false,
    },

    body:{
        type: Sequelize.TEXT,
        allowNull: false,
    }
});

Category.hasMany(article); //Uma categoria têm muitos artigos
article.belongsTo(Category);//Um artigo pertence a uma categoria

article.sync({force: true});

module.exports = article;
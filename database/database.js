const Sequelize = require("sequelize");
const connection = new Sequelize('blogpress', 'root', 'luismiguel123', {
    host: 'localhost',
    dialect: 'mysql',
    timezone:"-03:00"
});

module.exports = connection; 
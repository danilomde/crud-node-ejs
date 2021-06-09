const Sequelize = require("sequelize");

const connection = new Sequelize('nodeperguntas', 'root', '',{
    dialect: 'sqlite',
    storage: 'database/database.sqlite' // or ':memory:'
})


module.exports = connection;
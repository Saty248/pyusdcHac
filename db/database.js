const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2')

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, 
    {dialect: "mysql", dialectModule: mysql2, host: process.env.HOST, 
    port: process.env.PORT});

module.exports = sequelize;
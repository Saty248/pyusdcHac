const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2')

// const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, 
//     {dialect: "mysql", dialectModule: mysql2, host: process.env.HOST, 
//     port: process.env.PORT});

const sequelize = new Sequelize("sky_claim_dev", "sky_claim_dev", "Pw2dv8i8g4hmkOj", 
    {dialect: "mysql", dialectModule: mysql2, host: "mysql-17204-0.cloudclusters.net", 
    port: "17204"});

module.exports = sequelize;
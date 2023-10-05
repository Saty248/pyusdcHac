const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');

console.log(process.env.DATABASE)
console.log(process.env.USER)
console.log(process.env.PASSWORD)
console.log(process.env.HOST)
console.log(process.env.DB_PORT)

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, 
    {dialect: "mysql", dialectModule: mysql2, host: process.env.HOST, 
    port: process.env.DB_PORT});


module.exports = sequelize;

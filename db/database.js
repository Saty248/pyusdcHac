const { Sequelize } = require('sequelize');
import pg from 'pg';

// const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, 
//     {dialect: "postgres", host: process.env.DB_HOST, dialectModule: pg,
//     port: process.env.DB_PORT});

const sequelize = new Sequelize("postgres", "hi_user", "hI!48Xy#5eF&6gH%", 
    {dialect: "postgres", host: "database-1.ckqupuwojbng.us-east-2.rds.amazonaws.com", dialectModule: pg,
    port: "5432"});


console.log(process.env.DB_DATABASE)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_HOST)
console.log(process.env.DB_PORT)

module.exports = sequelize;

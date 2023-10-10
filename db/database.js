const { Sequelize } = require('sequelize');
import pg from 'pg';

// const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, 
//     {dialect: "postgres", host: process.env.HOST, dialectModule: pg,
//     port: process.env.DB_PORT});

const sequelize = new Sequelize("postgres", "hi_user", "hI!48Xy#5eF&6gH%", 
    {dialect: "postgres", host: "database-1.ckqupuwojbng.us-east-2.rds.amazonaws.com", dialectModule: pg,
    port: "5432"});


module.exports = sequelize;

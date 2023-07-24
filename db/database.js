const Sequelize = require('sequelize');

export const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, 
    {dialect: "mysql", host: process.env.HOST, 
    port: process.env.PORT});


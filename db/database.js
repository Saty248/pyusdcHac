const { Sequelize } = require('sequelize');
import pg from 'pg';

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, 
    {dialect: "postgres", host: process.env.HOST, dialectModule: pg,
    port: process.env.DB_PORT});


module.exports = sequelize;

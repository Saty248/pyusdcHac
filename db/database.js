const { Sequelize } = require('sequelize');
import pg from 'pg';

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, 
    {dialect: "postgres", host: process.env.DB_HOST, dialectModule: pg,
    port: process.env.DB_PORT});


module.exports = sequelize;

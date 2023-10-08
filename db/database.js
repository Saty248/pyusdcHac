const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');

console.log(process.env.DATABASE)
console.log(process.env.USER)
console.log(process.env.PASSWORD)
console.log(process.env.HOST)
console.log(process.env.DB_PORT)
console.log(process.env.LOCATIONIQ_KEY)

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, 
    {dialect: "postgres", host: process.env.HOST, 
    port: process.env.DB_PORT});

    const testConnect = async() => {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
            } catch (error) {
            console.error('Unable to connect to the database:', error);
            }
    }

    testConnect();
    
module.exports = sequelize;

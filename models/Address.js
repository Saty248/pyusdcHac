// const Sequelize = require('sequelize');
const sequelize = require("../db/database")
import { DataTypes } from "sequelize";

 const Address = sequelize.define("Location", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
                type: DataTypes.STRING,
                allowNull: false
            },
    lastname: {
                type: DataTypes.STRING,
                allowNull: false
            },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coordinates: {
        type: DataTypes.JSON,
        defaultValue: [],
        allowNull: false
    }
});

// module.exports = Address;
export default Address;
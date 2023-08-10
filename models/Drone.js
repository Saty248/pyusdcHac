const sequelize = require("../db/database")
import { DataTypes } from "sequelize";

const Drone = sequelize.define("Drone", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    ownerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    operatorName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    physicalAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mailingAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    drone: {
        type: DataTypes.JSON,
        defaultValue: [],
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Drone;
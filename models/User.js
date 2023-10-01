const sequelize = require("../db/database");
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    wallet: {
        type: DataTypes.STRING,
        allowNull: false
    },
    newsletter: {
        type: DataTypes.BOOLEAN
    }
})


export default User;

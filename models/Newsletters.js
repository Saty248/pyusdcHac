const sequelize = require("../db/database");
import { DataTypes } from "sequelize";

const Newsletter = sequelize.define("newsletter", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    date: {
        type: DataTypes.STRING,
        allowNull: false
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    text: {
        type: DataTypes.STRING,
        allowNull: false
    },

    link: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Newsletter;
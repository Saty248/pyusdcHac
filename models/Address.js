import Sequelize from "sequelize";
import { sequelize } from "@/db/database";
import { DataTypes } from "sequelize";

export const Address = sequelize.define("address", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
                type: Sequelize.STRING,
                allowNull: false
            },
    lastname: {
                type: Sequelize.STRING,
                allowNull: false
            },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    longitude: {
        type: Sequelize.STRING,
        allowNull: false
    },
    latitude: {
        type: Sequelize.STRING,
        allowNull: false
    },
    coordinates: {
        type: DataTypes.JSON,
        defaultValue: [],
        allowNull: false
    }
});
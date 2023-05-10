const sequelize = require('../db');
const DataTypes = require('sequelize');

// Kyle these are like classes in python, 

sequelize.define('Book', {
    pk: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    UUID: {
        type: DataTypes.UUIDV4,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    coverImageUrl: {
        type: DataTypes.STRING,
    },
    // Maybe this should be a foreign key instead? For sorting?
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // Could be an issue for non western languages.
            max: 80
        }
    },
    summary: {
        type: DataTypes.CHAR(500),
        allowNull: false,
    }
})
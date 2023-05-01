const sequelize = require('../db');
const DataTypes = require('sequelize');

// First rendition of a user that allows people to create authentication
const User = sequelize.define('User', {
    pk: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 32
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    YOE: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
});

module.exports = User;
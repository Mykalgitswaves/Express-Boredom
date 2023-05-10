const sequelize = require('../db');
const DataTypes = require('sequelize');

// First rendition of a user that allows people to create authentication
const User = sequelize.define('User', {
    pk: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        // Might not need this but putting it in to be safe.
        unique: true
    },
    UUID: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
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
});

module.exports = User;
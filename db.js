require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, 'root', process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    port: '3306'
})

// test to make sure the connection is working?
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize;
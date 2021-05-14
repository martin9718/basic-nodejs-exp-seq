const Sequelize = require('sequelize')

require('../config/config');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});



sequelize.sync({force:false})
    .then(() => {
        console.log('Database connected successfully')
    })
    .catch(err => {
        console.log('Failed to connect database');
        console.log(err);
    });

module.exports = sequelize;
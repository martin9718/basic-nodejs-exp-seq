const Sequelize = require('sequelize')
const db = require('../db');

const User = db.define('User', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    full_name: Sequelize.STRING,
    email: Sequelize.STRING,
    uuid: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: Sequelize.UUIDV4
    },
    password: Sequelize.STRING,
    email_token: Sequelize.STRING,
    user_rol_id: Sequelize.INTEGER,
    is_active: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    createdAt: {
        type: Sequelize.DataTypes.DATE,
        field: 'date_created',
    },
    updatedAt: {
        type: Sequelize.DataTypes.DATE,
        field: 'date_updated'
    }

}, {
    tableName: 'users'
});




module.exports = {
    User
};
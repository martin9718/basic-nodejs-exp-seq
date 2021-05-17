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

const UserRole = db.define('UserRole', {
    name: Sequelize.STRING,
    createdAt: {
        type: Sequelize.DataTypes.DATE,
        field: 'date_created',
    },
    updatedAt: {
        type: Sequelize.DataTypes.DATE,
        field: 'date_updated'
    }

}, {
    tableName: 'user_roles'
});

const AccessToken = db.define('AccessToken', {
    token: Sequelize.STRING,
    expiry_time: Sequelize.INTEGER,
    createdAt: {
        type: Sequelize.DataTypes.DATE,
        field: 'date_created',
    },
    updatedAt: {
        type: Sequelize.DataTypes.DATE,
        field: 'date_updated'
    }

}, {
    tableName: 'access_tokens'
});




module.exports = {
    User,
    UserRole,
    AccessToken
};
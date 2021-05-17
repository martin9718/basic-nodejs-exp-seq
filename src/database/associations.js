const { User, UserRole} = require('./models/User');

UserRole.hasMany(User,{ foreignKey: 'user_rol_id'});
User.belongsTo(UserRole, { foreignKey: 'user_rol_id'});
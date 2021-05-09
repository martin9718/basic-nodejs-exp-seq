const { User, UserAdress} = require('./models/User');

User.hasOne(UserAdress,{ foreignKey: 'user_id'});
UserAdress.belongsTo(User, { foreignKey: 'user_id'});
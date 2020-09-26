module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User',
    {
      userId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: true },
      isAdmin: { type: DataTypes.STRING, allowNull: true },
      isBlocked: { type: DataTypes.STRING, allowNull: true },
    }
  );

  return User;
};



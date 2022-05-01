const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// Create User Model
class User extends Model {
  // Set up check for password
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

// Define columns for User
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3],
      },
    },
  },
  {
    hooks: {
      // setup beforeCreate lifecycle 'hook' functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      // setup beforeUpdate lifecycle 'hook' functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;

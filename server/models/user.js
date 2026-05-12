'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs");
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Cuisine, {foreignKey: "AuthorId"})
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Email Needed!"
        },
        notEmpty: {
          msg: "Email needed!"
        },
        isEmail: {
          msg: "Email invalid!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password required!"
        },
        notNull: {
          msg: "Password required!"
        },
        len:{
          args: 5,
          msg: "Minimum password is 5 characters"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "Staff"
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password)
  })
  return User;
};
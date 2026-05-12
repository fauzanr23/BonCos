'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cuisine.belongsTo(models.User, {foreignKey: "AuthorId"})
      Cuisine.belongsTo(models.Category, {foreignKey: "CategoryId"})
    }
  }
  Cuisine.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: "Name required!"
        },
        notNull: {
          msg: "Name required!"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: "Description required!"
        },
        notNull: {
          msg: "Description required!"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: "Price required!"
        },
        notNull: {
          msg: "Price required!"
        },
        min: {
          args: 5000,
          msg: "Minimum price must be 5000!"
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: "Image required!"
        },
        notNull: {
          msg: "Image required!"
        },
        isUrl: {
          msg: "URL needed!"
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: "Category id required!"
        },
        notNull: {
          msg: "Category id required!"
        }
      }
    },
    AuthorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: "Author id required!"
        },
        notNull: {
          msg: "Author id required!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cuisine',
  });
  return Cuisine;
};
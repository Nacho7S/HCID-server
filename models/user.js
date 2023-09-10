'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/hashPassword');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {foreignKey: "authorId"})
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "this Email has been registered"
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is Required"
        },
        notEmpty: {
          msg: "Email is Required"
        },
        isEmail: {
          msg: "Must Email Format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password is Required"
        },
        notEmpty: {
          msg: "password is Required"
        },
        isMinLengthCharacter(value) {
          if (value.length < 5 && value.length !== 0) {
            throw new Error('min Password length is 5 characters')
          }
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance, options) {
        instance.password = hashPassword(instance.password)
      }
    }
  });
  return User;
};
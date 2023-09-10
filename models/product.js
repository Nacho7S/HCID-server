'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
      Product.belongsTo(models.User, { foreignKey: 'authorId' });
      Product.hasMany(models.Images, {foreignKey: "productId", onDelete: 'CASCADE', hooks: true})
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is Required"
        },
        notEmpty:{
          msg: "Name is Required"
        },
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "slug is Required"
        },
        notEmpty:{
          msg: "slug is Required"
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description is Required"
        },
        notEmpty:{
          msg: "Description is Required"
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price is Required"
        },
        notEmpty:{
          msg: "Price is Required"
        },
        min: {
          args: 60_000,
          msg: `minimun price is Rp. 60.000,00`
        }
      },
    },
    mainImg: {
      type: DataTypes.STRING,
      allowNull: false,
      onDelete: 'CASCADE',
      validate: {
        notNull: {
          msg: "MainImg is Required"
        },
        notEmpty:{
          msg: "MainImg is Required"
        },
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      validate: {
        notNull: {
          msg: "category is Required"
        },
        notEmpty:{
          msg: "category is Required"
        },
      },
    },
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
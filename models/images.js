'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static async bulkCreateImages(imageDataArray) {
    //   return this.bulkCreate(imageDataArray);
    // }
    static associate(models) {
      // define association here
      Images.belongsTo(models.Product, {foreignKey: "productId", onDelete:'CASCADE', hooks: true})
    }
  }
  Images.init({
    productId: DataTypes.INTEGER,
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "imgUrl is Required"
        },
        notEmpty:{
          msg: "imgUrl is Required"
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Images',
    tableName: 'Images'
  });
  return Images;
};
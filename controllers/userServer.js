const { Op } = require('sequelize');
const {Product, Category, Images} = require('../models')

class UserServerController{
  static async getAllProducts(req, res, next) {
    try {
      const { search } = req.query
      let filter
      if (search) {
        filter = {
          name: {
            [Op.iLike]: `%${search}%`
          }
        }
      }
      const Products = await Product.findAll({
        include: [Category],
        where: filter
      })
      res.status(200).json(Products)
    }catch(err){
      console.log(err);
      next(err)
    }
  }

  static async getProductsByslug(req, res, next) {
    const {slug} = req.params
    try {
      const ProductBySlug = await Product.findOne({
        where: { slug: slug },
        include:[Category, Images]
      })
      res.status(200).json(ProductBySlug)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

}

module.exports = UserServerController
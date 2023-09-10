const { Product, Images, Category , User ,sequelize } = require("../models")

class ProductsController {
  static async getAllProductsList(req, res, next) {
    try {
      const products = await Product.findAll({
        include: [Category, User],
      }, {
        order: ['createdAt', 'DESC']
      })
      res.status(200).json(products)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async getProductsListById(req, res, next) {
    const { id } = req.params
    console.log(id);
    try {
      const productDataById = await Product.findOne({
        where: { id: id },
        include:[Category, Images]
      })
      if(!productDataById) throw {name: "notFound"}
      res.status(200).json(productDataById)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async addProducts(req, res, next) {
    const transaction = await sequelize.transaction();
    const { payload, imgUrls } = req.body
    console.log(req.body);
    console.log(payload, imgUrls, "ini banh bodnyanya");
    try {
      const addedProduct = await Product.create({
        name: payload.name,
        slug: payload.name.split(' ').join('-') + - + Math.floor(Math.random() * 100),
        description: payload.description,
        price: payload.price,
        mainImg: payload.mainImg,
        categoryId: payload.categoryId,
        authorId: req.user.id
      }, { transaction })

      const dataImgUrl = imgUrls.map(el => {
        return {
          productId: addedProduct.id,
          imgUrl: el
        }
      })
      // console.log(dataImgUrl);
      const dataImage = await Images.bulkCreate(dataImgUrl
        , { transaction })

      await transaction.commit()
      res.status(201).json({addedProduct, dataImage})
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      next(err)
    }
  }


  static async editProduct(req, res, next) {
    const { id } = req.params
    const {payload, imgUrls} = req.body
    try {
      const editUpdated = await Product.update({
        name: payload.name,
        slug: payload.name.split(' ').join('-') + - + Math.floor(Math.random() * 100),
        description: payload.description,
        price: payload.price,
        mainImg: payload.mainImg,
        categoryId: payload.categoryId,
      }, {
        where: {
          id: id
        }
      })
      await Images.destroy({
        where:{productId: id}
      })
      console.log(editUpdated, "ini error dari update");
      const dataImgUrl = imgUrls.map(el => {
        return {
          productId: id,
          imgUrl: el
        }
      })


      const dataImage = await Images.bulkCreate(dataImgUrl)

      res.status(200).json({editUpdated, dataImage})
    } catch (err) {
      console.log(err);
      next(err)
    }
  } 

  static async deleteProducts(req, res, next) {
    const { id } = req.params
    try {
      const findDeletedProducts = await Product.findByPk(id)
      const deleteImages = await Images.destroy({
        where: {
          productId: id
        }
      })
      const deleteProductsById = await Product.destroy({
        where: {
          id: id
        }
      })
      res.status(200).json({ findDeletedProducts })
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = ProductsController 

const {Category} = require("../models")

class CategoriesController {
  static async fetchCategories(req, res, next) {
    try {
      const categories = await Category.findAll()
      res.status(200).json(categories)
    } catch (err) {
      console.log(err);
    }
  }

  static async addCategories(req, res, next) {
    const {name} = req.body
    try {
      const addedCategory = await Category.create({
        name: name
      })
      res.status(201).json(addedCategory)
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteCategory(req, res, next) {
    const { id } = req.params
    try {
      const findDeletedCategories = await Category.findByPk(id)
      const deleteCategoryById = await Category.destroy({
        where: {
          id: id
        }
      })
      res.status(200).json({ findDeletedCategories })
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = CategoriesController
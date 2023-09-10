const CategoriesController = require("../controllers/categories")

const categories = require("express").Router()

categories.post('/', CategoriesController.addCategories)
categories.get('/', CategoriesController.fetchCategories)
categories.delete('/:id', CategoriesController.deleteCategory)
module.exports = categories
const ProductsController = require('../controllers/products')

const products = require('express').Router()

products.get('/', ProductsController.getAllProductsList)
products.post('/', ProductsController.addProducts)
products.get('/:id', ProductsController.getProductsListById)
products.put('/:id', ProductsController.editProduct)
products.delete('/:id', ProductsController.deleteProducts)

module.exports = products
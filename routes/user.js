const UserServerController = require("../controllers/userServer")

const user = require("express").Router()

user.get('/products', UserServerController.getAllProducts)
user.get('/products/:slug', UserServerController.getProductsByslug)

module.exports = user
const authentication = require('../middleware/authentication');
const categories = require('./categories');
const login = require('./login');
const products = require('./products');
const register = require('./register');
const user = require('./user');
const router = require('express').Router()

//User server
router.use("/user", user)

// admin server
router.use("/register", register)
router.use("/login", login)
router.use(authentication)
router.use("/products", products)
router.use("/categories", categories)

module.exports = router
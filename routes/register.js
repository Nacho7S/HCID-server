const registerController = require('../controllers/register')

const register = require('express').Router()

register.post('/', registerController.handleRegister)

module.exports = register
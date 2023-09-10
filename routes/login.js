const ControllerLogin = require('../controllers/login')

const login = require('express').Router()

login.post('/', ControllerLogin.handleLogin)

module.exports = login
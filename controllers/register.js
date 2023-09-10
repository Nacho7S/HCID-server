const {User} = require('../models')

class registerController{
  static async handleRegister(req, res, next) {
    const { username, email, password, phoneNumber, address } = req.body
    try {
      const users = await User.create({
        username,
        email,
        password,
        role: 'Admin',
        phoneNumber,
        address
      })
      res.status(201).json({
        username: users.username,
        email: users.email
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = registerController
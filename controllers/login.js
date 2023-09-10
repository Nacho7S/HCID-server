const { comparePassword } = require('../helpers/hashPassword');
const { signToken } = require('../helpers/jwt');
const {User} = require ('../models')

class ControllerLogin {
  static async handleLogin(req, res, next) {
    // console.log(req.body)
    const { email, password } = req.body
    console.log(req.body);
    try {
      if (!email) throw { name: "email can't be empty" }
      if (!password) throw { name: `Password can't be empty` };

      const user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) {
        throw { name: "Invalid Login" }
      }
      
      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) throw { name: "Invalid Login" }

      // console.log(user);

      const accessToken = signToken({
        id: user.id,
        email: user.email
      })

      res.status(200).json({
        access_token: accessToken,
        user
      })
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = ControllerLogin
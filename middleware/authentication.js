const { verifyToken } = require("../helpers/jwt.js");
const { User } = require("../models")

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    console.log(req.headers);
    // console.log(access_token);

    if (!access_token) {
      throw { name: "Unauthenthicated" }
    }

    const decoded = verifyToken(access_token)
    // console.log(decoded);
    const findUser = await User.findOne({
      where: {
        id: decoded.id,
        email: decoded.email
      }
    })

    // console.log(findUser);
    if (!findUser) {
      throw { name: "Unauthenthicated" }
    }

    req.user = {
      id: findUser.id,
      username: findUser.username,
      email: findUser.email,
      role: findUser.role
    }

    next()
  } catch (error) {
    next({ name: "Unauthenticated"})
  }
}

module.exports = authentication
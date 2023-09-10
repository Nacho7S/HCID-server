const bcrypt = require('bcryptjs')
const SALT = bcrypt.genSaltSync(10)

const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, SALT)
}


const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword)
}

module.exports = { hashPassword, comparePassword}
const { User } = require('../../database/models')

const findUserByEmail = (email) => {
  return User.findOne({
    where: {
      email
    }
  })
}

module.exports = {
  findUserByEmail
}
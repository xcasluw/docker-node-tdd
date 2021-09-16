const { User } = require('../../database/models')

const findUserByEmail = (email) => {
  return User.findOne({
    where: {
      email
    }
  })
}

const createUser = (name, email, password) => {
  return User.create({
      name, email, password
    }
  )
  .then(async (user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }
  })
  .catch(err => err)
}

module.exports = {
  findUserByEmail,
  createUser
}
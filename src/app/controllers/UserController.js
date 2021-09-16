const { createUserSchema } = require('../validators/user.validator')
const userRepository = require('../repositories/UserRepository')

class UserController {
  async store(req, res) {
    const { error } = createUserSchema.validate(req.body)

    if (error) {
      const msg = error.details[0].message.replace(/"/g, '')
      return res.status(400).json({ error: msg })
    }

    const { name, email, password } = req.body

    const userExists = await userRepository.findUserByEmail(email)

    if (userExists) {
      return res.status(400).json({ error: 'An user with provided email already exists' })
    }

    const user = await userRepository.createUser(name, email, password)

    if (user) {
      return res.status(200).json({ user })
    } else {
      return res.status(400).json({ error: 'There was an error creating the user' })
    }
  }
}

module.exports = new UserController()
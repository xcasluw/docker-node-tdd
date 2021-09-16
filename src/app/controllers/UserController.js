const { User } = require('../../database/models')

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body

    if (!name) {
      return res.status(400).json({ error: 'Name not provided' })
    }

    if (!email) {
      return res.status(400).json({ error: 'Email not provided' })
    }

    if (!password) {
      return res.status(400).json({ error: 'Password not provided' })
    }

    const userExists = await User.findOne({ where: { email } })

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const user = await User.create({ 
      name, email, password
     })

    return res.json({ 
      user
    })
  }
}

module.exports = new UserController()
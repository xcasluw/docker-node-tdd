const { User } = require('../../database/models')

class SessionController {
  async store(req, res) {
    const { email, password } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email not provided' })
    }

    if (!password) {
      return res.status(400).json({ error: 'Password not provided' })
    }

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Wrong password' })
    }

    return res.json({ 
      user,
      token: user.generateToken()
    })
  }
}

module.exports = new SessionController()
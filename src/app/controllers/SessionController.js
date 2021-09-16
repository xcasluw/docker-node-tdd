const { sessionSchema } = require('../validators/session.validator')
const sessionRepository = require('../repositories/SessionRepository')

class SessionController {
  async store(req, res) {
    const { error } = sessionSchema.validate(req.body)

    if (error) {
      const msg = error.details[0].message.replace(/"/g, '')
      return res.status(400).json({ error: msg })
    }

    const { email, password } = req.body

    const userDB = await sessionRepository.findUserByEmail(email)

    if (!userDB) {
      return res.status(401).json({ error: 'User not found' })
    }

    if (!(await userDB.checkPassword(password))) {
      return res.status(401).json({ error: 'Wrong password' })
    }

    const user = {
      id: userDB.id,
      name: userDB.name,
      email: userDB.email,
    }

    return res.json({ 
      user,
      token: userDB.generateToken()
    })
  }
}

module.exports = new SessionController()
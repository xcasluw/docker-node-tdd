const routes = require('express').Router()

const authMiddleware = require('./app/middlewares/auth')

const SessionController = require('./app/controllers/SessionController')
const UserController = require('./app/controllers/UserController')
const DashboardController = require('./app/controllers/DashboardController')

routes.get('/', (req, res) => {
  return res.json({ msg: 'API OK' })
})

routes.post('/sessions', SessionController.store)

routes.post('/users', UserController.store)

routes.use(authMiddleware)

routes.get('/dashboard', DashboardController.index)

module.exports = routes
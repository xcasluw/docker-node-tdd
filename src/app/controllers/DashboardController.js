class DashboardController {
  async index(req, res) {
    return res.status(200).json({ msg: 'Dashboard is ok' })
  }
}

module.exports = new DashboardController()
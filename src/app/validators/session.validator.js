const Joi = require('joi')

const sessionSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

module.exports = {
  sessionSchema
}
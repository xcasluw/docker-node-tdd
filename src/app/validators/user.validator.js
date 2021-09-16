const Joi = require('joi')

const createUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
})

module.exports = {
  createUserSchema
}
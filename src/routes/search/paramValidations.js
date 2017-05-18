import Joi from 'utils/customJoi'

export default {
  create: {
    body: {
      name: Joi.string().trim().required(),
      domain: Joi.string().trim().required()
    }
  }
}

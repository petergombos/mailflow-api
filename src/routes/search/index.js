import { Router } from 'express'
import validate from 'express-validation'

import { create, get } from 'utils/routeHandlers'
import controller from 'controllers/search'

import validations from './paramValidations'

const router = Router()

router.route('/')
  .post(validate(validations.create), create(controller))

router.route('/:id')
  .get(get(controller))

export default router

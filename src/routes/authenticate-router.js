/**
 * Authenticate router.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { AuthenticateController } from '../controllers/authenticate-controller.js'

export const router = express.Router()
const authenticateController = new AuthenticateController()

router.get('/', authenticateController.info)

router.use('*', (req, res, next) => next(createError(404)))

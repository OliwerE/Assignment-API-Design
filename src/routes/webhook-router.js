/**
 * Webhook router.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { readFileSync } from 'fs'
import jwt from 'jsonwebtoken'
import { WebhookController } from '../controllers/webhook-controller.js'

export const router = express.Router()
const webhookController = new WebhookController()

/**
 * Authorizes user.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {object} next - Next function.
 * @returns {object} - Return object.
 */
const authorizeUser = (req, res, next) => {
  try {
    const jwtToken = req.headers.authorization

    if (jwtToken === undefined) return next(createError(401))

    const privateKey = readFileSync('public.pub', 'utf-8')
    const payload = jwt.verify(jwtToken, privateKey)

    req.user = {
      username: payload.username,
      userId: payload.userId,
      permissionLevel: payload.x_permission_level
    }
    return next()
  } catch (err) {
    next(createError(401))
  }
}

router.get('/', authorizeUser, webhookController.getOwnWebhooks)
router.post('/:event', authorizeUser, webhookController.register)
// router.put('/:id', authorizeUser, webhookController.info)
// router.delete('/:id', authorizeUser, webhookController.info)

router.use('*', (req, res, next) => next(createError(404)))

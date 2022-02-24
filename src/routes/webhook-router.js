/**
 * Webhook router.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { WebhookController } from '../controllers/webhook-controller.js'

export const router = express.Router()
const webhookController = new WebhookController()

router.get('/', webhookController.info)

router.use('*', (req, res, next) => next(createError(404)))

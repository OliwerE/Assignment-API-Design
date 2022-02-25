/**
 * Module represents the webhook controller.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import createError from 'http-errors'
import { Webhook } from '../models/webhook-model.js'

/**
 * Class represents the webhook controller.
 */
export class WebhookController {
  /**
   * Information about available webhooks.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {object} next - Next function.
   */
  info (req, res, next) {
    try {
      res.json({ message: 'Webhook controller, ToDo: add info' })
    } catch (err) {
      next(createError(500))
    }
  }

  // ToDo list an users registered hooks

  /**
   * Registers a new webhook
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {object} next - Next function.
   */
  async register (req, res, next) {
    try {
      const event = req.params.event
      const username = req.user.username
      const { hookURL, token } = req.body

      if (event !== undefined && event !== '' && username !== undefined && hookURL !== undefined && hookURL !== '' && token !== undefined && token !== '') {
        if (event === 'new-report') {
          const newWebhook = new Webhook({
            user: username,
            eventType: event,
            hookURL: hookURL,
            token: token
          })
          await newWebhook.save()
          res.status(201).json({ message: 'Webhook has been created!' }) //ToDo Return webhook
        } else {
          next(createError(404))
        }
      } else {
        next(createError(400))
      }
    } catch (err) {
      next(createError(500))
    }
  }

  // unregister (req, res, next) {
    
  // }
}

/**
 * Module represents the webhook controller.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import createError from 'http-errors'
// import { FishReport } from '../models/fish-report-model.js'

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
}

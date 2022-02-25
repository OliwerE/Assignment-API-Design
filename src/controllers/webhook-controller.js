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
   * Returns a users own webhooks.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {object} next - Next function.
   */
  async getOwnWebhooks (req, res, next) {
    try {
      const numOfHooks = 10
      const page = parseInt(req.query.page || 1)
      const query = { user: req.user.username }

      const ownWebhooks = (await Webhook.find(query).sort({ createdAt: -1 }).limit(numOfHooks).skip(numOfHooks * (page - 1))).map(R => ({
        id: R._id,
        user: R.user,
        eventType: R.eventType,
        hookURL: R.hookURL,
        token: R.token,
        createdAt: R.createdAt,
        updatedAt: R.updatedAt
      }))

      if (ownWebhooks.length <= 0) {
        next(createError(404))
      } else {
        const numOfPages = Math.ceil((await Webhook.countDocuments(query)) / numOfHooks)
        res.json({ message: 'Your webhooks.', page, numOfPages, ownWebhooks })
      }
    } catch (err) {
      next(createError(500))
    }
  }

  // ToDo list an users registered hooks

  /**
   * Registers a new webhook.
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

  /**
   * Deletes a webhook.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {object} next - Next function.
   */
  async deleteWebhook (req, res, next) {
    try {
      const webhookID = req.params.id
      const webhook = await Webhook.findOne({ _id: webhookID }).catch(() => {
        next(createError(404))
      })

      if (webhook === null) {
        next(createError(404))
      } else if (webhook.user === req.user.username) {
        await Webhook.deleteOne({ _id: webhookID })
        res.status(200).json({ message: 'Webhook has been removed!' })
      } else if (webhook.user !== req.user.username) {
        next(createError(401))
      } else {
        next(createError(500))
      }
    } catch (err) {
      next(createError(500))
    }
  }

  // unregister (req, res, next) {
    
  // }
}

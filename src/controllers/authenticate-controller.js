/**
 * Module represents auth controller.
 */

import createError from 'http-errors'
// import { User } from '../models/user-model.js'

/**
 * Class represents the authorization controller.
 */
export class AuthenticateController {
  /**
   * Explains how to authenticate.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {object} next - Next function.
   */
  info (req, res, next) {
    res.json({ msg: 'Hello from authenticate controller!' })
  }
}

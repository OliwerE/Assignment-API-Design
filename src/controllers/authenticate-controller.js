/**
 * Module represents auth controller.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
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

  /**
   * Login an user.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {object} next - Next function.
   */
  login (req, res, next) {
    res.json({ msg: 'login' })
  }

  /**
   * Register an user.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {object} next - Next function.
   */
  register (req, res, next) {
    res.json({ msg: 'register' })
  }
}

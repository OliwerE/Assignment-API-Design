/**
 * Module represents auth controller.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import createError from 'http-errors'
import { User } from '../models/user-model.js'

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
   * Checks if the username and password is valid.
   *
   * @param {object} requstBody - Request body from a request.
   * @returns {boolean} - If the request body contains valid content.
   */
  #isBodyValid (requstBody) {
    const { username, password } = requstBody

    if (username === undefined || password === undefined || username === '' || password === '') {
      return false
    } else if (username.length < 1 || username.length > 1000 || password.length < 10 || password.length > 1000) {
      return false
    }
    return true
  }

  /**
   * Register an user.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {object} next - Next function.
   * @returns {object} - Response object.
   */
  register (req, res, next) {
    console.log(this.#isBodyValid(req.body))
    if (!this.#isBodyValid(req.body)) {
      return res.status(400).json({
        msg: 'Invalid username and / or password! Username must have a length between 1-1000 and password 10-1000.'
      })
    }
    const { username, password } = req.body

    // Check if username/password are entered

    // check if exist


    // create if not exist

    res.json({ msg: 'register' })
  }
}

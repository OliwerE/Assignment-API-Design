/**
 * Module represents auth controller.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import createError from 'http-errors'
import bcrypt from 'bcrypt'
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
  async register (req, res, next) {
    try {
      if (!this.#isBodyValid(req.body)) {
        return res.status(400).json({
          msg: 'Invalid username and / or password! Username must have a length between 1-1000 and password 10-1000.'
        })
      }

      const { username, password } = req.body
      const numOfUsernameInDB = await User.find({ username })

      if (numOfUsernameInDB.length === 0) {
        const newUser = new User({
          username,
          password: await bcrypt.hash(password, 8)
        })
        newUser.save()
        res.status(201).json({ msg: 'User has been created!' })
      } else if (numOfUsernameInDB.length > 0) {
        res.status(409).json({ msg: 'Username does already exist! Please choose another or login.' })
      } else {
        next(createError(500))
      }
    } catch (err) {
      next(createError(500))
    }
  }
}

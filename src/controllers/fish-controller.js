/**
 * Module represents the course controller.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import createError from 'http-errors'

/**
 * Class represents the course controller.
 */
export class FishController {
  /**
   * Information about courses.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {object} next - Next function.
   */
  info (req, res, next) {
    try {
      res.json({ message: 'some text...' })
    } catch (err) {
      next(createError(500))
    }
  }

  testProtected (req, res, next) {
    try {
      res.json({ message: 'auth works!' })
    } catch (err) {
      next(createError(500))
    }
  }
}

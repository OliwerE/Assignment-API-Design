/**
 * Course router.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { readFileSync } from 'fs'
import jwt from 'jsonwebtoken'
import { FishReportController } from '../controllers/fish-report-controller.js'

export const router = express.Router()
const fishController = new FishReportController()

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

router.get('/', fishController.getFishReports)
router.get('/:category/:categoryValue', fishController.getFishReports)
router.post('/', authorizeUser, (req, res, next) => fishController.createFishReport(req, res, next))
router.put('/:id', authorizeUser, (req, res, next) => fishController.updateFishReport(req, res, next))
router.delete('/:id', authorizeUser, (req, res, next) => fishController.deleteFishReport(req, res, next))

router.use('*', (req, res, next) => next(createError(404)))

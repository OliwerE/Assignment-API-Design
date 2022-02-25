/**
 * Express main router.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { router as authenticateRouter } from './authenticate-router.js'
import { router as fishReportRouter } from './fish-report-router.js'
import { router as webhookRouter } from './webhook-router.js'

export const router = express.Router()

router.get('/', (req, res, next) => { res.json({ message: 'Hello World!' }) })
router.use('/authenticate', authenticateRouter)
router.use('/fish-reports', fishReportRouter)
router.use('/webhooks', webhookRouter)

router.use('*', (req, res, next) => next(createError(404)))

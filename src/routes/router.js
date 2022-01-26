/**
 * Express main router.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'

export const router = express.Router()

router.get('/', (req, res, next) => { res.json({ msg: 'Hello World!' }) })

router.use('*', (req, res, next) => next(createError(404)))

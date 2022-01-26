/**
 * Server configuration module.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import logger from 'morgan'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'

/**
 * Represents the Express server.
 */
async function startServer () {
  // Express setup
  const app = express()
  app.use(helmet())
  app.set('trust proxy', 1)
  app.use(cors({ origin: process.env.ORIGIN, credentials: true }))
  app.use(logger('dev'))
  app.use(express.json())

  // MongoDB
  await connectDB(app)

  // Router
  app.use('/', router)

  // Request errors
  app.use((err, req, res, next) => {
    if (err.status === 404) {
      return res.status(404).json({ message: 'Not Found', status: '404' })
    }

    if (err.status === 500) {
      return res.status(500).json({ message: 'Internal Server Error', status: '500' })
    }

    // ToDo: Add all errors here!
  })

  // Start Express
  app.listen(process.env.PORT, () => {
    console.log(`Listens for localhost@${process.env.PORT}`)
    console.log('ctrl + c to terminate')
  })
}
startServer()

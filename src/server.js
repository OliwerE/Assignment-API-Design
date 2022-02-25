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

  app.use((req, res, next) => {
    res.set('Cache-control', 'no-cache')
    next()
  })

  // Router
  app.use('/', router)

  // Request errors
  app.use((err, req, res, next) => {
    const hateoasLinks = {
      self: {
        href: (req.get('host') + req.originalUrl),
        requestTypes: ['GET']
      },
      start: {
        href: (req.get('host')),
        requestTypes: ['GET']
      },
      authenticate: {
        href: (req.get('host') + '/authenticate'),
        requestTypes: ['GET']
      },
      fishReports: {
        href: (req.get('host') + '/fish-reports'),
        requestTypes: ['GET']
      },
      webhooks: {
        href: (req.get('host') + '/webhooks'),
        requestTypes: ['GET']
      },
      webhook: {
        href: (req.get('host') + '/webhooks/webhook/:id'),
        requestTypes: ['GET', 'PUT', 'DELETE']
      }
    }

    const hateoasLinksNotAuth = {
      self: {
        href: (req.get('host') + req.originalUrl),
        requestTypes: ['GET']
      },
      login: {
        href: (req.get('host') + '/authenticate/login'),
        requestTypes: ['POST']
      },
      register: {
        href: (req.get('host') + '/authenticate/register'),
        requestTypes: ['POST']
      }
    }

    if (err.status === 400) {
      return res.status(400).json({ message: 'Bad Request', links: hateoasLinks })
    }

    if (err.status === 401) {
      return res.status(401).json({ message: 'Unauthorized', links: hateoasLinksNotAuth })
    }

    if (err.status === 403) {
      return res.status(403).json({ message: 'Forbidden', links: hateoasLinksNotAuth })
    }

    if (err.status === 404) {
      return res.status(404).json({ message: 'Not Found', links: hateoasLinks })
    }

    if (err.status === 500) {
      return res.status(500).json({ message: 'Internal Server Error', links: hateoasLinks })
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

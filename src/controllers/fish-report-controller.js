/**
 * Module represents the course controller.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import createError from 'http-errors'
import { FishReport } from '../models/fish-report-model.js'
import { WebhookController } from '../controllers/webhook-controller.js'

/**
 * Class represents the course controller.
 */
export class FishReportController {
  #webhookControler = new WebhookController()

  /**
   * Returns all fish reports.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {object} next - Next function.
   */
  async getFishReports (req, res, next) {
    try {
      const numOfReports = 10
      const page = parseInt(req.query.page || 1)

      if (page <= 0) {
        next(createError(404))
      }

      const query = {}

      if (req.params.category === 'fisherman') {
        query.fisherman = req.params.categoryValue
      } else if (req.params.category === 'lake' || req.params.category === 'river') {
        query.lakeRiverName = req.params.categoryValue
      } else if (req.params.category === 'city') {
        query.city = req.params.categoryValue
      } else if (req.params.category === 'specie') {
        query.fishSpecie = req.params.categoryValue
      } else if (req.params.category === 'weight') {
        query.weight = req.params.categoryValue
      } else if (req.params.category === 'length') {
        query.length = req.params.categoryValue
      }

      const reports = (await FishReport.find(query).sort({ createdAt: -1 }).limit(numOfReports).skip(numOfReports * (page - 1))).map(R => ({
        id: R._id,
        fisherman: R.fisherman,
        position: R.position,
        lakeRiverName: R.lakeRiverName,
        city: R.city,
        fishSpecie: R.fishSpecie,
        weight: R.weight,
        length: R.length,
        imageURL: R.imageURL,
        createdAt: R.createdAt,
        updatedAt: R.updatedAt
      }))

      if (reports.length <= 0) {
        next(createError(404))
      } else {
        const numOfPages = Math.ceil((await FishReport.countDocuments(query)) / numOfReports)
        res.json({ message: 'fish reports!!!', page, numOfPages, reports })
      }
    } catch (err) {
      console.log(err)
      next(createError(500))
    }
  }

  /**
   * Creates a fish report.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {object} next - Next function.
   */
  async createFishReport (req, res, next) {
    try {
      if (!this.#isCompleteReport(res, req.body)) return

      const { position, lakeRiverName, city, fishSpecie, weight, length, imageURL } = req.body

      const reportData = {
        fisherman: req.user.username,
        position,
        lakeRiverName,
        city,
        fishSpecie,
        weight,
        length,
        imageURL
      }

      const newFishReport = new FishReport(reportData)
      await newFishReport.save()
      res.status(201).json({ message: 'Fish report has been created!' }) // add link to report!!!

      // Send webhook event
      const report = await FishReport.findOne(reportData).catch(() => {
        next(createError(404))
      })
      this.#webhookControler.sendWebhookEvent('new-report', report)
    } catch (err) {
      next(createError(500))
    }
  }

  /**
   * Validates the fish report.
   * Creates error response if the report is invalid.
   *
   * @param {object} res - Response object.
   * @param {object} body - Request body object.
   * @returns {boolean} - If the report is valid.
   */
  #isCompleteReport (res, body) {
    const { position, lakeRiverName, city, fishSpecie, weight, length, imageURL } = body

    if (position === undefined || position === '') {
      res.status(400).json({ message: 'Position not defined.' })
      return false
    } else if (lakeRiverName === undefined || lakeRiverName === '') {
      res.status(400).json({ message: 'lakeRiverName not defined.' })
      return false
    } else if (city === undefined || city === '') {
      res.status(400).json({ message: 'City not defined.' })
      return false
    } else if (fishSpecie === undefined || fishSpecie === '') {
      res.status(400).json({ message: 'FishSpecie not defined.' })
      return false
    } else if (weight === undefined || weight === '') {
      res.status(400).json({ message: 'Weight not defined.' })
      return false
    } else if (length === undefined || length === '') {
      res.status(400).json({ message: 'Length not defined.' })
      return false
    } else if (imageURL === undefined || imageURL === '') {
      res.status(400).json({ message: 'ImageURL not defined.' })
      return false
    }
    return true
  }

  /**
   * Updates fish report.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {object} next - Next function.
   */
  async updateFishReport (req, res, next) {
    try {
      const reportID = req.params.id
      const report = await FishReport.findOne({ _id: reportID }).catch(() => {
        next(createError(404))
      })

      if (report === null) {
        next(createError(404))
      } else if (report.fisherman === req.user.username) {
        if (!this.#isCompleteReport(res, req.body)) return
        const { position, lakeRiverName, city, fishSpecie, weight, length, imageURL } = req.body

        await FishReport.updateOne({ _id: reportID }, { position, lakeRiverName, city, fishSpecie, weight, length, imageURL }, (error, response) => {
          if (error) {
            next(createError(500))
          }

          if (response) {
            if (response.n === 0) { // not updated
              next(createError(500))
            } else if (response.n === 1) {
              res.status(200).json({ message: 'Listing has been updated' }) // add link to resource!!!
            } else {
              next(createError(500))
            }
          }
        })
      } else if (report.fisherman !== req.user.username) {
        next(createError(401))
      } else {
        next(createError(500))
      }
    } catch (err) {
      next(createError(50))
    }
  }

  /**
   * Removes a fish report.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {object} next - Next function.
   */
  async deleteFishReport (req, res, next) {
    try {
      const reportID = req.params.id
      const report = await FishReport.findOne({ _id: reportID }).catch(() => {
        next(createError(404))
      })

      if (report === null) {
        next(createError(404))
      } else if (report.fisherman === req.user.username) {
        await FishReport.deleteOne({ _id: reportID })
        res.status(200).json({ message: 'Report has been removed!' })
      } else if (report.fisherman !== req.user.username) {
        next(createError(401))
      } else {
        next(createError(500))
      }
    } catch (err) {
      next(createError(500))
    }
  }
}

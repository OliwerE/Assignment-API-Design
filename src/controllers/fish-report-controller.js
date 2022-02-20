/**
 * Module represents the course controller.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import createError from 'http-errors'
import { FishReport } from '../models/fish-report-model.js'

/**
 * Class represents the course controller.
 */
export class FishReportController {
  /**
   * Information about courses.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {object} next - Next function.
   */
  /*
  info (req, res, next) {
    try {
      res.json({ message: 'some text...' })
    } catch (err) {
      next(createError(500))
    }
  }
  */

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

      // todo: different categories/speciets etc.

      const reports = (await FishReport.find({}).sort({ createdAt: -1 }).limit(numOfReports).skip(numOfReports * (page - 1))).map(R => ({
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
        const numOfPages = Math.ceil((await FishReport.countDocuments({})) / numOfReports)
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

      const newFishReport = new FishReport({
        fisherman: req.user.username,
        position,
        lakeRiverName,
        city,
        fishSpecie,
        weight,
        length,
        imageURL
      })
      await newFishReport.save()
      res.status(201).json({ message: 'Fish report has been created!' }) // add link to report!!!
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
}

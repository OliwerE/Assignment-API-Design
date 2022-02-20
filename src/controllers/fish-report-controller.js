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

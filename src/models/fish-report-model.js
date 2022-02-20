/**
 * Represents a fish report.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  fisherman: {
    type: String,
    minLength: 1,
    maxLength: 1000,
    required: true,
    unique: false,
    trim: true
  },
  position: {
    type: String,
    maxLength: 1000,
    required: true
  },
  lakeRiverName: {
    type: String,
    maxLength: 1000,
    required: true
  },
  city: {
    type: String,
    maxLength: 1000,
    required: true
  },
  fishSpecie: {
    type: String,
    maxLength: 1000,
    required: true
  },
  weigth: {
    type: String,
    maxLength: 1000,
    required: true
  },
  Length: {
    type: String,
    maxLength: 1000,
    required: true
  },
  ImageURL: {
    type: String,
    maxLength: 1000,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

export const FishReport = mongoose.model('FishReport', schema)

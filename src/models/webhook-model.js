/**
 * Represents a webhook.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  user: {
    type: String,
    minLength: 1,
    maxLength: 1000,
    required: true,
    unique: true,
    trim: true
  },
  eventType: {
    type: String,
    minLength: 10,
    maxLength: 1000,
    required: true
  },
  hookURL: {
    type: String,
    minLength: 10,
    maxLength: 1000,
    required: true
  },
  token: {
    type: String,
    minLength: 10,
    maxLength: 1000,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

export const Webhook = mongoose.model('Webhook', schema)

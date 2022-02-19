/**
 * Represents an user.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 1,
    maxLength: 1000,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    minLength: 10,
    maxLength: 1000,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

export const User = mongoose.model('User', schema)

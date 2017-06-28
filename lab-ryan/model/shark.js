'use strict';

const mongoose = require('mongoose');

const sharkSchema = mongoose.Schema({
  type: {type: String, required: true, unique: true},
  length: {type: Number, required: true},
  weight: {type: Number, required: true},
  toothCount: {type: Number, required: true},
});

const Shark = module.exports = mongoose.model('shark', sharkSchema);

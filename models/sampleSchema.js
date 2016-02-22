'use strict';

var mongoose = require('mongoose');

var sampleSchema = mongoose.Schema({
  name: String,
  asin: String,
  searchRank: Number,
  upc: String,
  linkIds: Array,
  price: Object,
  ranks: Array,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sample', sampleSchema);

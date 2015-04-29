'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DrawingSchema = new Schema({
  'userid': String,
  'data':String,
  'drawid': String,
  'title': String,
  'desc':String,
  'date':{ type: Date, default: Date.now }
  // 'time':String,
});

DrawingSchema.index({ userid: 1, drawid: -1 });

module.exports = mongoose.model('drawing', DrawingSchema);

'use strict';

/**
 * Module dependencies
 */
var path = require('path')
const mongoose = require('mongoose')
const Shift = mongoose.model('Shift')
const errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'))
const _ = require('lodash')
const moment = require('moment')


/**
 * Create an article
 */
exports.create = function (req, res) {

  const shift = new Shift(req.body);
  const start = moment(shift.startDate)
  const end = moment(shift.endDate)
  const duration = moment.duration(end.diff(start))
  const hours = duration.asHours()
  const workingHour = hours - 1.5
  shift.workingHour = workingHour
  shift.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(shift);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.shift);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  let shift = req.shift;
  shift = _.assignIn(shift, req.body);
  shift.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(shift);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  const shift = req.shift;
  shift.deleted = true;
  shift.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(shift);
    }
  });
};

/**
 * List of Articles
 */
exports.list = async function (req, res) {
  const shifts = await Shift.find({ deleted: false })
    .sort('-created')
    .populate({
      path: 'user',
      select: 'displayName company',
      populate: {
        path: 'company',
        select: 'name'
      }
    })
    .exec()
  res.json(shifts)

};

/**
 * Article middleware
 */
exports.shiftById = function (req, res, next, id) {
  Shift.findById(id).populate('user', 'displayName').exec(function (err, shift) {
    if (err) return next(err);
    if (!shift) return next(new Error('Failed to load  ' + id));
    req.shift = shift;
    next();
  });

};

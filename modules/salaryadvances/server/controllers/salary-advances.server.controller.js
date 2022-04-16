'use strict';

/**
 * Module dependencies
 */
var path = require('path')
const mongoose = require('mongoose')
const SalaryAdvance = mongoose.model('SalaryAdvance')
const errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'))
const _ = require('lodash')
const moment = require('moment')
const business = require('moment-business-days')


/**
 * Create an article
 */
exports.create = function (req, res) {

  // const salaryAdvance = new salaryAdvance(req.body);
  // const start = moment(shift.startDate)
  // const end = moment(shift.endDate)
  // const duration = moment.duration(end.diff(start))
  // const hours = duration.asHours()
  // const workingHour = hours - 1.5
  // shift.workingHour = workingHour
  salaryAdvance.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(salaryAdvance);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.salaryAdvance);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  let salaryAdvance = req.salaryAdvance;
  salaryAdvance = _.assignIn(salaryAdvance, req.body);
  salaryAdvance.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(salaryAdvance);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  const salaryAdvance = req.salaryAdvance;
  salaryAdvance.deleted = true;
  salaryAdvance.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(salaryAdvance);
    }
  });
};

/**
 * List of Articles
 */
exports.list = async function (req, res) {
  const salaryAdvances = await SalaryAdvance.find({ deleted: false })
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
  res.json(salaryAdvances)

};

/**
 * Article middleware
 */
exports.salaryAdvanceById = function (req, res, next, id) {
  SalaryAdvance.findById(id).populate('user', 'displayName').exec(function (err, salaryAdvance) {
    if (err) return next(err);
    if (!salaryAdvance) return next(new Error('Failed to load  ' + id));
    req.salaryAdvance = salaryAdvance;
    next();
  });

};

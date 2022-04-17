'use strict';

/**
 * Module dependencies
 */
var path = require('path')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Shift = mongoose.model('Shift')
const Fee = mongoose.model('Fee')
const SalaryAdvance = mongoose.model('SalaryAdvance')
const errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'))
const _ = require('lodash')
const moment = require('moment')
const businessMoment = require('moment-business-days')

/**
 * Create an article
 */
exports.getCurrentSalaryByShift = async function (req, res) {
  const startDate = moment().startOf('month')
  const endDate = moment().endOf('month')
  const user = req.user
  const businessDay = businessMoment(startDate).businessDiff(endDate)
  const shifts = await Shift.aggregate()
    .match({
      user: user._id,
      startDate: { $gte: startDate.toDate() },
      endDate: { $lte: endDate.toDate() }
    })
    .group({
      _id: '$user',
      currentWorkingHours: { $sum: '$workingHour' },
    })
  const userWithSalary = await User.findOne({
    _id: user._id
  })
  .populate('salary','salary')
  .exec()
  console.log(userWithSalary);
  const currentWorkingHours = shifts[0].currentWorkingHours
  const totalWorkingHoursInMonth = businessDay * 8
  const moneyBefore = currentWorkingHours * userWithSalary.salary.salary / totalWorkingHoursInMonth
  console.log(currentWorkingHours);
  console.log(totalWorkingHoursInMonth);
  console.log(moneyBefore);
  res.json({
    moneyBefore: moneyBefore
    })
  // return res.json(startDate)
}

exports.create =async function (req, res) {


  const salaryAdvance = new SalaryAdvance(req.body);
  const fee =await Fee.findOne({
    deleted: false,
    startMoney : { $lte: salaryAdvance.moneyAdvance },
    endMoney : { $gt: salaryAdvance.moneyAdvance }
  }).exec()

  console.log(fee);
  if(!fee){
    return res.status(400).send({
      message: 'Số tiền ứng quá lớn với mức phí,vui lòng liên hệ quản lý để được hỗ trợ'
    })
  }
  salaryAdvance.moneyFee = fee.feeMoney
  salaryAdvance.moneyGet = salaryAdvance.moneyAdvance - salaryAdvance.moneyFee
  salaryAdvance.moneyAfter = salaryAdvance.moneyBefore - salaryAdvance.moneyFee - salaryAdvance.moneyAdvance 
  salaryAdvance.fee = fee._id
  salaryAdvance.user = req.user

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

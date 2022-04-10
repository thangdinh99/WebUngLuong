'use strict';

/**
 * Module dependencies
 */
// const _ = require('lodash')
var path = require('path')
const mongoose = require('mongoose')
const Salary = mongoose.model('Salary')
const errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'))

exports.create = function (req, res) {
  var salary = new Salary(req.body);
  salary.user = req.user;
  console.log(salary);
  salary.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(salary);
    }
  });
};

exports.add = function (req, res) {
  var salary = new Salary(req.body);
  salary.user = req.user;
  console.log(salary);
  salary.save().then(function (salary) {
    res.json(salary);
  }).catch(function (err) {
    res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};



exports.read = function (req, res) {
  res.json(req.salary);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  let salary = req.salary;
  salary.title = req.body.title;
  salary.salary = req.body.salary;
  // salary = _.assignIn(salary, req.body);
  salary.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(salary);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  const salary = req.salary;
  salary.deleted = true;
  salary.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(salary);
    }
  });
};

/**
 * List of Articles
 */
exports.list = async function (req, res)   {
  const salaries = await Salary.find({ deleted: false })
    .sort('-created')
    .populate('user', 'displayName')
    .exec()
  res.json(salaries)

};

/**
 * Article middleware
 */
exports.salaryById = function (req, res, next, id) {
  Salary.findById(id).populate('user', 'displayName').exec(function (err, salary) {
    if (err) return next(err);
    if (!salary) return next(new Error('Failed to load article ' + id));
    req.salary = salary;
    next();
  });

};

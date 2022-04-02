'use strict';

/**
 * Module dependencies
 */
var path = require('path')
const mongoose = require('mongoose')
const Company = mongoose.model('Company')
const errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'))

/**
 * Create an article
 */
exports.create = function (req, res) {
  const company = new Company(req.body);
  company.user = req.user;

  company.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(company);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.company);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  const company = req.company;
  company.name = req.body.name;
  company.code = req.body.code;
  company.address = req.body.address;
  company.phone = req.body.phone;
  company.active = req.body.active;

  company.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(company);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  const company = req.company;
  company.deleted = true;
  company.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(company);
    }
  });
};

/**
 * List of Articles
 */
exports.list = async (req, res) => {
  const companies = await Company.find({ deleted: false })
    .sort('-created')
    .populate('user', 'displayName')
    .exec()
  res.json(companies)

};

/**
 * Article middleware
 */
exports.companyById = function (req, res, next, id) {
  Company.findById(id).populate('user', 'displayName').exec(function (err, company) {
    if (err) return next(err);
    if (!company) return next(new Error('Failed to load article ' + id));
    req.company = company;
    next();
  });

};

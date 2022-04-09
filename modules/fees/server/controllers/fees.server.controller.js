'use strict';

/**
 * Module dependencies
 */
var path = require('path')
const mongoose = require('mongoose')
const Fee = mongoose.model('Fee')
const errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'))
const _ = require('lodash')

/**
 * Create an article
 */
exports.create = function (req, res) {
  const fee = new Fee(req.body);
  fee.user = req.user;

  fee.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(fee);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.fee);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  let fee = req.fee;
  fee = _.assignIn(fee, req.body);
  fee.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(fee);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  const fee = req.fee;
  fee.deleted = true;
  fee.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(fee);
    }
  });
};

/**
 * List of Articles
 */
exports.list = async function (req, res) {
  const fees = await Fee.find({ deleted: false })
    .sort('-created')
    .populate('user', 'displayName')
    .exec()
  res.json(fees)

};

/**
 * Article middleware
 */
exports.feeById = function (req, res, next, id) {
  Fee.findById(id).populate('user', 'displayName').exec(function (err, fee) {
    if (err) return next(err);
    if (!fee) return next(new Error('Failed to load article ' + id));
    req.fee = fee;
    next();
  });

};

'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current user
 */
exports.read = function (req, res) {
  res.json(req.model);
};

/**
 * Update a User
 */
exports.update = function (req, res) {
  var user = req.model;

  // For security purposes only merge these parameters
  console.log(req.body);
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.username = req.body.username;
  user.displayName = user.lastName + ' ' + user.firstName;
  user.roles = req.body.roles;
  user.company = req.body.company;
  user.salary = req.body.salary;
  user.phone = req.body.phone;
  user.address = req.body.address;
  user.active = req.body.active;
  

  user.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    
    res.json(user);
  });
};

exports.create = function (req, res) {

  // Init user and add missing fields
  var user = new User(req.body);
  user.provider = 'local';
  user.displayName = user.lastName + ' ' + user.firstName;
  user.roles = req.body.roles;

  // Then save the user
  user.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // Remove sensitive data before login
      return res.status(200).send({
        message: 'Tạo người dùng thành công',
        user: user
      })
    }
  });
};

/**
 * Delete a user
 */
exports.delete = function (req, res) {
  var user = req.model;
  user.deleted = true;
  user.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(user);
    }
  });
};

/**
 * List of Users
 */
exports.list = function (req, res) {
  User.find({deleted : false}, '-salt -password -providerData')
  .sort('-created')
  .populate('user', 'displayName')
  .populate('company', 'name')
  .exec(function (err, users) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(users);
  });
};

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findById(id, '-salt -password -providerData').exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load user ' + id));
    }

    req.model = user;
    next();
  });
};

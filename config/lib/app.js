'use strict';

const { includes } = require('lodash');
/**
 * Module dependencies.
 */
var path=require('path'),
  config = require('../config'),
  mongooseService = require('./mongoose'),
  express = require('./express'),
  chalk = require('chalk'),
  seed = require('./mongo-seed');

function seedDB() {
  if (config.seedDB && config.seedDB.seed) {
    console.log(chalk.bold.red('Warning:  Database seeding is turned on'));
    seed.start();
  }
}

module.exports.init = async function init(callback) {
  mongooseService.connect( async function (db) {
    // Initialize Models
    await mongooseService.loadModels(seedDB);

    // Initialize express
    var app = await express.init(db);
    if (callback) callback(app, db, config);

  });
};

module.exports.start =async function start(callback) {
  var _this = this;

    await _this.init(async function (app, db, config) {

    // Start the app by listening on <port> at <host>
    await app.listen(config.port, config.host, function () {
      // Create server URL
      var server = (process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + config.host + ':' + config.port;
      // Logging initialization
      console.log('--');
      console.log(chalk.green(config.app.title));
      console.log();
      console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
      console.log(chalk.green('Server:          ' + server));
      console.log(chalk.green('Database:        ' + config.db.uri));
      console.log(chalk.green('App version:     ' + config.meanjs.version));
      if (config.meanjs['meanjs-version'])
        console.log(chalk.green('ALOBRIDGE ' + config.meanjs['meanjs-version']));
      console.log('--');

      if (callback) callback(app, db, config);
    });
  });

  // const salary = includes(path.resolve('./modules/salaryadvances/server/controllers/salary-advances.server.controller.js'))
  // salary.getCurrentSalaryByShift()

};

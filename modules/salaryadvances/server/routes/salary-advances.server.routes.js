'use strict';

// const { Router } = require('express')
// const router = Router()
const salaryAdvances = require('../controllers/salary-advances.server.controller');

module.exports = function (app) {
   
    app.route('/api/salaryAdvances')
        .get(salaryAdvances.list)
        .post(salaryAdvances.create);
   
    app.route('/api/salaryAdvances/:salaryAdvanceId')
        .get(salaryAdvances.read)
        .put(salaryAdvances.update)
        .delete(salaryAdvances.delete);

    
    app.param('salaryAdvanceId', salaryAdvances.salaryAdvanceById);
};
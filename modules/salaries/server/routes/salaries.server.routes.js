'use strict';

// const { Router } = require('express')
// const router = Router()
const salaries = require('../controllers/salaries.server.controller');

// module.exports = router
module.exports = function (app) {
    // Articles collection routes
    app.route('/api/salaries')
        .get(salaries.list)
        .post(salaries.create);
    // Single article routes
    app.route('/api/salaries/:salaryId')
        .get(salaries.read)
        .put(salaries.update)
        .delete(salaries.delete);

    // Finish by binding the article middleware
    app.param('salaryId', salaries.salaryById);
};
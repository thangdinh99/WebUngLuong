'use strict';

// const { Router } = require('express')
// const router = Router()
const companies = require('../controllers/companies.server.controller');


// router.route('/api/companies')
//     .get(companies.list)
//     .post(companies.create);


// // Finish by binding the article middleware
// router.param('companyId', companies.companyById);

// module.exports = router
module.exports = function (app) {
    // Articles collection routes
    app.route('/api/companies')
        .get(companies.list)
        .post(companies.create);
    // Single article routes
    app.route('/api/companies/:companyId')
        .get(companies.read)
        .put(companies.update)
        .delete(companies.delete);

    // Finish by binding the article middleware
    app.param('companyId', companies.companyById);
};
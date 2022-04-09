'use strict';

// const { Router } = require('express')
// const router = Router()
const fees = require('../controllers/fees.server.controller');

module.exports = function (app) {
   
    app.route('/api/fees')
        .get(fees.list)
        .post(fees.create);
   
    app.route('/api/fees/:feeId')
        .get(fees.read)
        .put(fees.update)
        .delete(fees.delete);

    
    app.param('feeId', fees.feeById);
};
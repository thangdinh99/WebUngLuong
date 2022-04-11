'use strict';

// const { Router } = require('express')
// const router = Router()
const shifts = require('../controllers/shifts.server.controller');

module.exports = function (app) {
   
    app.route('/api/shifts')
        .get(shifts.list)
        .post(shifts.create);
   
    app.route('/api/shifts/:shiftId')
        .get(shifts.read)
        .put(shifts.update)
        .delete(shifts.delete);

    
    app.param('shiftId', shifts.shiftById);
};
'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path'),
    config = require(path.resolve('./config/config')),
    chalk = require('chalk');

/**
 * Article Schema
 */
var SalaryAdvanceSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    moneyBefore : {
        type: Number,
    },
    moneyAfter : {
        type: Number,
    },
    moneyAdvance : {
        type: Number,
    },
    moneyGet : {
        type: Number,
    },
    moneyFee : {
        type: Number,
    },
    fee : {
        type : Schema.ObjectId,
        ref : 'Fee',
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    accepted : {
        type: Boolean,
        default: false
    },
    acceptBy: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    deleted: {
        type: Boolean,
        default: false
    }

}, { timestamp: true });

// SalaryAdvanceSchema.pre('save', function (next) {
    
//     if(this.workingHour > 8) {
//         this.workingHour = 8;
//     }
//     next();
// });

mongoose.model('SalaryAdvance', SalaryAdvanceSchema);

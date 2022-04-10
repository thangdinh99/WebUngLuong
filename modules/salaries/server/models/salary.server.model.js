'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path'),
    config = require(path.resolve('./config/config')),
    chalk = require('chalk');

var SalarySchema = new Schema({
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Chưa điền tên bậc lương'
    },
    salary: {
        type: Number,
        default: 0,
        trim: true,
        requied: 'Chưa điền số tiền lương'
    },
    deleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});


mongoose.model('Salary', SalarySchema);



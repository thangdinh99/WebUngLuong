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
var SalarySchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Chưa điền tiêu đề'
    },
    salary: {
        type: Number,
        required: 'Chưa điền số tiền lương',
        default: 0,
    },
    deleted: {
        type: Boolean,
        default: false
    }

}, { timestamp: true });


mongoose.model('Salary', SalarySchema);

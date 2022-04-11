'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path'),
    config = require(path.resolve('./config/config')),
    chalk = require('chalk');


var CompanySchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Chưa điền tên công ty'
    },
    code: {
        type: String,
        required: 'Chưa điền mã công ty',
        default: '',
        unique: true
    },
    address: {
        type: String,
        default: ''
    },
    phone: {
        type: Number,
        required: 'Chưa điền mã công ty',
        default: '',
    },
    retireHour: {
        type: Number,
        required: 'Chưa điền giờ nghỉ ngơi công ty',
        default: 0,
    },
    active: {
        type: Boolean,
        default: true
    },
    user : {
        type: Schema.ObjectId,
        ref: 'User'
    },
    deleted: {
        type: Boolean,
        default: false
    }

}, { timestamp: true });


mongoose.model('Company', CompanySchema);

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
var FeeSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    startMoney: {
        type: Number,
        required: 'Chưa điền mốc tính phí dưới',
        default: '0',
    },
    endMoney: {
        type: Number,
        required: 'Chưa điền mốc tính phí trên',
        default: '0',
    },
    feeMoney: {
        type: Number,
        required: 'Chưa điền số tiền phí',
        default: '0',
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    deleted: {
        type: Boolean,
        default: false
    }

}, { timestamp: true });


mongoose.model('Fee', FeeSchema);

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
        required: 'Chưa điền hạn mốc bắt đầu phí ứng',
        
    },
    endMoney: {
        type: Number,
        required: 'Chưa điền hạn mốc kết thúc phí ứng',
        
    },
    feeMoney: {
        type: Number,
        required: 'Chưa điền số tiền phí',
        
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

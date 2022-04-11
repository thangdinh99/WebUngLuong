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
var ShiftSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    startDate: {
        type: Date,
        required: 'Vui lòng điền giờ bắt đầu vào làm',
    },
    endDate: {
        type: Date,
        required: 'Vui lòng điền giờ kết thúc vào làm'
    },
    workingHour: {
        type: Number,
        default: 8
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: 'Vui lòng chọn nhân viên'
    },
    deleted: {
        type: Boolean,
        default: false
    }

}, { timestamp: true });

ShiftSchema.pre('save', function (next) {
    
    if(this.workingHour > 8) {
        this.workingHour = 8;
    }
    next();
});

mongoose.model('Shift', ShiftSchema);

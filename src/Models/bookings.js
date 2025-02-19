"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
var mongoose_1 = require("mongoose");
var rooms_1 = require("./rooms");
var BookingsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    check_in: {
        type: String,
        required: true
    },
    check_out: {
        type: String,
        required: true
    },
    request: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Check-Out', 'Check-In', 'In Progress']
    },
    price: {
        type: Number,
        required: true
    },
    room: {
        type: rooms_1.RoomModel.schema,
        required: true
    }
});
var Bookings = mongoose_1.default.model('Bookings', BookingsSchema);
exports.BookingModel = mongoose_1.default.model('Bookings', BookingsSchema);
exports.default = Bookings;

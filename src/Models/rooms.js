"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModel = void 0;
var mongoose_1 = require("mongoose");
var RoomSchema = new mongoose_1.default.Schema({
    number: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    offer: {
        type: Number,
        required: true,
    },
    roomStatus: {
        type: String,
        required: true,
        enum: ["Booked", "Available"],
    },
    type: {
        type: String,
        required: true,
        enum: ["Suite", "Double Superior", "Single Bed", "Double Bed"],
    },
    amenities: {
        type: [String],
        required: true,
        enum: [
            "FREE WIFI",
            "TV LED",
            "2 BATHROOM",
            "AC",
            "3 BED SPACE",
            "COFEE SET",
            "BATHUP",
            "TOWEL",
            "SHOWER",
        ],
    },
});
var Room = mongoose_1.default.model('Room', RoomSchema);
exports.RoomModel = mongoose_1.default.model('Rooms', RoomSchema);
exports.default = Room;

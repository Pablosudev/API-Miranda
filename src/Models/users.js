"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
var mongoose_1 = require("mongoose");
var UsersSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Inactive']
    },
    department: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
var Users = mongoose_1.default.model('Users', UsersSchema);
exports.UsersModel = mongoose_1.default.model('Users', UsersSchema);
exports.default = Users;

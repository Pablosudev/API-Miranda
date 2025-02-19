"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModel = void 0;
var mongoose_1 = require("mongoose");
var ContactSchema = new mongoose_1.default.Schema({
    date: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});
var Contact = mongoose_1.default.model('Contact', ContactSchema);
exports.ContactModel = mongoose_1.default.model('Contact', ContactSchema);
exports.default = Contact;

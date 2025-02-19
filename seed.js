"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var database_1 = require("./src/Utils/database");
var rooms_1 = require("./src/Models/rooms");
var contact_1 = require("./src/Models/contact");
var users_1 = require("./src/Models/users");
var bookings_1 = require("./src/Models/bookings");
require("dotenv/config");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        //RoomsFaker
        function generateRooms() {
            return __awaiter(this, void 0, void 0, function () {
                var number, price, offer, roomStatus, type, amenities, room;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            number = faker_1.faker.number.int({ min: 1, max: 500 });
                            price = faker_1.faker.commerce.price({ min: 80, max: 1000 });
                            offer = faker_1.faker.number.int({ min: 0, max: 20 });
                            roomStatus = faker_1.faker.helpers.arrayElement(["Booked", "Available"]);
                            type = faker_1.faker.helpers.arrayElement([
                                "Suite",
                                "Double Bed",
                                "Single Bed",
                                "Double Superior",
                            ]);
                            amenities = faker_1.faker.helpers.arrayElements([
                                "FREE WIFI",
                                "TV LED",
                                "2 BATHROOM",
                                "AC",
                                "3 BED SPACE",
                                "COFEE SET",
                                "BATHUP",
                                "TOWEL",
                                "SHOWER",
                            ], { min: 1, max: 5 });
                            room = new rooms_1.default({
                                number: number,
                                price: price,
                                offer: offer,
                                roomStatus: roomStatus,
                                type: type,
                                amenities: amenities,
                            });
                            return [4 /*yield*/, room.save()];
                        case 1:
                            _a.sent();
                            console.log("Room saved:", room);
                            return [2 /*return*/];
                    }
                });
            });
        }
        //ContactFaker
        function generateContact() {
            return __awaiter(this, void 0, void 0, function () {
                var date, name, email, phone, subject, comment, contact;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            date = faker_1.faker.date.recent();
                            name = faker_1.faker.person.fullName();
                            email = faker_1.faker.internet.email();
                            phone = faker_1.faker.phone.number();
                            subject = faker_1.faker.lorem.words(3);
                            comment = faker_1.faker.lorem.paragraph();
                            contact = new contact_1.default({
                                date: date,
                                name: name,
                                email: email,
                                phone: phone,
                                subject: subject,
                                comment: comment,
                            });
                            return [4 /*yield*/, contact.save()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        //User Faker
        function generateUser() {
            return __awaiter(this, void 0, void 0, function () {
                var name, email, start_date, description, phone, status, department, password, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            name = faker_1.faker.person.fullName();
                            email = faker_1.faker.internet.email();
                            start_date = faker_1.faker.date.recent();
                            description = faker_1.faker.lorem.paragraph();
                            phone = faker_1.faker.phone.number();
                            status = faker_1.faker.helpers.arrayElement(["Active", "Inactive"]);
                            department = faker_1.faker.helpers.arrayElement(["Manager", "IT", "Finance"]);
                            password = faker_1.faker.internet.password();
                            user = new users_1.default({
                                name: name,
                                email: email,
                                start_date: start_date,
                                description: description,
                                phone: phone,
                                status: status,
                                department: department,
                                password: password,
                            });
                            return [4 /*yield*/, user.save()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        //Bookings Faker
        function generateBookings() {
            return __awaiter(this, void 0, void 0, function () {
                var name, date, check_in, check_out, request, status, price, type, number, roomStatus, offer, amenities, bookings;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            name = faker_1.faker.person.fullName();
                            date = faker_1.faker.date.past();
                            check_in = faker_1.faker.date.recent();
                            check_out = faker_1.faker.date.future();
                            request = faker_1.faker.lorem.paragraph();
                            status = faker_1.faker.helpers.arrayElement(['In Progress', 'Check-In', 'Check-Out']);
                            price = faker_1.faker.commerce.price({ min: 80, max: 1000 });
                            type = faker_1.faker.helpers.arrayElement([
                                'Suite',
                                'Double Bed',
                                'Single Bed',
                                'Double Superior',
                            ]);
                            number = faker_1.faker.number.int({ min: 1, max: 500 });
                            roomStatus = faker_1.faker.helpers.arrayElement(["Booked", "Available"]);
                            offer = faker_1.faker.number.int({ min: 0, max: 20 });
                            amenities = faker_1.faker.helpers.arrayElements([
                                "FREE WIFI",
                                "TV LED",
                                "2 BATHROOM",
                                "AC",
                                "3 BED SPACE",
                                "COFEE SET",
                                "BATHUP",
                                "TOWEL",
                                "SHOWER",
                            ], { min: 1, max: 5 });
                            bookings = new bookings_1.default({
                                name: name,
                                date: date,
                                check_in: check_in,
                                check_out: check_out,
                                request: request,
                                price: price,
                                number: number,
                                status: status,
                                type: type,
                                room: {
                                    type: type,
                                    number: number,
                                    roomStatus: roomStatus,
                                    price: price,
                                    offer: offer,
                                    amenities: amenities,
                                }
                            });
                            return [4 /*yield*/, bookings.save()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        var i, i, i, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, database_1.default)()];
                case 1:
                    _a.sent();
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < 10)) return [3 /*break*/, 5];
                    return [4 /*yield*/, generateRooms()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    i = 0;
                    _a.label = 6;
                case 6:
                    if (!(i < 10)) return [3 /*break*/, 9];
                    return [4 /*yield*/, generateContact()];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 6];
                case 9:
                    i = 0;
                    _a.label = 10;
                case 10:
                    if (!(i < 10)) return [3 /*break*/, 13];
                    return [4 /*yield*/, generateUser()];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12:
                    i++;
                    return [3 /*break*/, 10];
                case 13:
                    i = 0;
                    _a.label = 14;
                case 14:
                    if (!(i < 10)) return [3 /*break*/, 17];
                    return [4 /*yield*/, generateBookings()];
                case 15:
                    _a.sent();
                    _a.label = 16;
                case 16:
                    i++;
                    return [3 /*break*/, 14];
                case 17: return [2 /*return*/];
            }
        });
    });
}
main();

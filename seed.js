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
var database_1 = require("./src/Utils/database");
var rooms_1 = require("./src/Models/rooms");
require("dotenv/config");
var bcryptjs = require("bcryptjs");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        // Rooms Faker
        function generateRooms() {
            return __awaiter(this, void 0, void 0, function () {
                var number, price, offer, roomStatus, type, amenities, query, room;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            number = faker.datatype.number({ min: 1, max: 500 });
                            price = parseFloat(faker.commerce.price({ min: 80, max: 1000 }));
                            offer = faker.datatype.number({ min: 0, max: 20 });
                            roomStatus = faker.helpers.shuffle(["Available", "Booked"])[0];
                            type = faker.helpers.shuffle([
                                "Suite",
                                "Double Bed",
                                "Single Bed",
                                "Double Superior",
                            ])[0];
                            amenities = faker.helpers
                                .shuffle([
                                "FREE WIFI",
                                "TV LED",
                                "2 BATHROOM",
                                "AC",
                                "3 BED SPACE",
                                "COFEE SET",
                                "BATHUP",
                                "TOWEL",
                                "SHOWER",
                            ], { min: 1, max: 5 })
                                .join(",");
                            query = "\n    INSERT INTO rooms (number, price, offer, roomStatus, type, amenities) \n    VALUES (?, ?, ?, ?, ?, ?)\n  ";
                            room = new rooms_1.default({
                                number: number,
                                price: price,
                                offer: offer,
                                roomStatus: roomStatus,
                                type: type,
                                amenities: amenities,
                            });
                            return [4 /*yield*/, connection.execute(query, [
                                    number,
                                    price,
                                    offer,
                                    roomStatus,
                                    type,
                                    amenities,
                                ])];
                        case 1:
                            _a.sent();
                            console.log("Room saved:", {
                                number: number,
                                price: price,
                                offer: offer,
                                roomStatus: roomStatus,
                                type: type,
                                amenities: amenities,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        }
        // Contact Faker
        function generateContact() {
            return __awaiter(this, void 0, void 0, function () {
                var date, formattedDate, name, email, phone, subject, comment, query, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            date = new Date();
                            formattedDate = date.toISOString().slice(0, 10);
                            name = faker.name.findName();
                            email = faker.internet.email();
                            phone = faker.datatype
                                .number({ min: 100000000, max: 999999999 })
                                .toString();
                            subject = faker.lorem.words(3);
                            comment = faker.lorem.paragraph();
                            query = "\n      INSERT INTO contacts (date, name, email, phone, subject, comment) \n      VALUES (?, ?, ?, ?, ?, ?)\n    ";
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, connection.execute(query, [
                                    formattedDate,
                                    name,
                                    email,
                                    phone,
                                    subject,
                                    comment,
                                ])];
                        case 2:
                            _a.sent();
                            console.log("Contact saved:", {
                                formattedDate: formattedDate,
                                name: name,
                                email: email,
                                phone: phone,
                                subject: subject,
                                comment: comment,
                            });
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            console.error("Error saving contact:", error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        // User Faker
        function generateUser() {
            return __awaiter(this, void 0, void 0, function () {
                var name, email, start_date, description, phone, status, department, password, hashedPassword, query;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            name = faker.name.findName();
                            email = "1234@gmail.com";
                            start_date = faker.date.recent();
                            description = faker.lorem.paragraph();
                            phone = faker.datatype
                                .number({ min: 100000000, max: 999999999 })
                                .toString();
                            status = faker.helpers.shuffle(["Active", "Inactive"])[0];
                            department = faker.helpers.shuffle([
                                "MANAGER",
                                "ROOM SERVICE",
                                "RECEPTIONIST",
                            ])[0];
                            password = "1234";
                            return [4 /*yield*/, bcryptjs.hash(password, 10)];
                        case 1:
                            hashedPassword = _a.sent();
                            query = "\n      INSERT INTO users (name, email, start_date, description, phone, status, department, password) \n      VALUES (?, ?, ?, ?, ?, ?, ?, ?)\n    ";
                            return [4 /*yield*/, connection.execute(query, [
                                    name,
                                    email,
                                    start_date,
                                    description,
                                    phone,
                                    status,
                                    department,
                                    hashedPassword,
                                ])];
                        case 2:
                            _a.sent();
                            console.log("User saved:", {
                                name: name,
                                email: email,
                                start_date: start_date,
                                description: description,
                                phone: phone,
                                status: status,
                                department: department,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        }
        // Bookings Faker
        function generateBookings() {
            return __awaiter(this, void 0, void 0, function () {
                var name, date, check_in, check_out, request, status, rows, room_id, query;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            name = faker.name.findName();
                            date = faker.date.past();
                            check_in = faker.date.recent();
                            check_out = faker.date.future();
                            request = faker.lorem.paragraph().slice(0, 255);
                            status = faker.helpers.shuffle([
                                "In progress",
                                "Check-In",
                                "Check-Out",
                            ])[0];
                            return [4 /*yield*/, connection.execute("SELECT id FROM rooms ORDER BY RAND() LIMIT 1")];
                        case 1:
                            rows = (_a.sent())[0];
                            if (!(Array.isArray(rows) && rows.length > 0)) return [3 /*break*/, 3];
                            room_id = rows[0].id;
                            query = "\n      INSERT INTO bookings (name, date, check_in, check_out, request, status, room_id) \n      VALUES (?, ?, ?, ?, ?, ?, ?)\n    ";
                            return [4 /*yield*/, connection.execute(query, [
                                    name,
                                    date,
                                    check_in,
                                    check_out,
                                    request,
                                    status,
                                    room_id,
                                ])];
                        case 2:
                            _a.sent();
                            console.log("Booking saved:", {
                                name: name,
                                date: date,
                                check_in: check_in,
                                check_out: check_out,
                                request: request,
                                status: status,
                                room_id: room_id
                            });
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        var connection, faker, mysql, i, i, i, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, database_1.connectDB)()];
                case 1:
                    connection = _a.sent();
                    faker = require("faker");
                    mysql = require("mysql2/promise");
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
                case 17:
                    console.log("Seed data insertion completed.");
                    connection.end();
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (error) { return console.error("Error in seed data insertion:", error); });

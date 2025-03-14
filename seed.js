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
require("dotenv/config");
var bcryptjs = require("bcryptjs");
var faker_1 = require("@faker-js/faker");
// **Generate Rooms**
function generateRooms() {
    return __awaiter(this, void 0, void 0, function () {
        var number, price, offer, roomStatus, type, amenities, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    number = faker_1.faker.number.int({ min: 1, max: 500 });
                    price = parseFloat(faker_1.faker.commerce.price({ min: 80, max: 1000 }));
                    offer = faker_1.faker.number.int({ min: 0, max: 20 });
                    roomStatus = faker_1.faker.helpers.shuffle(["Available", "Booked"])[0];
                    type = faker_1.faker.helpers.shuffle([
                        "Suite",
                        "Double Bed",
                        "Single Bed",
                        "Double Superior",
                    ])[0];
                    amenities = faker_1.faker.helpers
                        .arrayElements([
                        "FREE WIFI",
                        "TV LED",
                        "2 BATHROOM",
                        "AC",
                        "3 BED SPACE",
                        "COFFEE SET",
                        "BATHUP",
                        "TOWEL",
                        "SHOWER",
                    ], { min: 1, max: 5 })
                        .join(",");
                    return [4 /*yield*/, database_1.sequelize.query("INSERT INTO rooms (number, price, offer, roomStatus, type, amenities) \n       VALUES (?, ?, ?, ?, ?, ?)", {
                            replacements: [number, price, offer, roomStatus, type, amenities],
                        })];
                case 1:
                    _a.sent();
                    console.log("Room saved:", { number: number, price: price, offer: offer, roomStatus: roomStatus, type: type, amenities: amenities });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error generating room:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// **Generate Contact**
function generateContact() {
    return __awaiter(this, void 0, void 0, function () {
        var date, formattedDate, name_1, email, phone, subject, comment, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    date = new Date();
                    formattedDate = date.toISOString().slice(0, 10);
                    name_1 = faker_1.faker.name.fullName();
                    email = faker_1.faker.internet.email();
                    phone = faker_1.faker
                        .number.int({ min: 100000000, max: 999999999 })
                        .toString();
                    subject = faker_1.faker.lorem.words(3);
                    comment = faker_1.faker.lorem.paragraph();
                    // Insertar el contacto usando Sequelize
                    return [4 /*yield*/, database_1.sequelize.query("INSERT INTO contacts (date, name, email, phone, subject, comment) \n       VALUES (?, ?, ?, ?, ?, ?)", {
                            replacements: [formattedDate, name_1, email, phone, subject, comment],
                        })];
                case 1:
                    // Insertar el contacto usando Sequelize
                    _a.sent();
                    console.log("Contact saved:", { formattedDate: formattedDate, name: name_1, email: email, phone: phone, subject: subject, comment: comment });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error generating contact:", error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// **Generate User**
function generateUser() {
    return __awaiter(this, void 0, void 0, function () {
        var name_2, email, start_date, description, phone, status_1, department, password, hashedPassword, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    name_2 = faker_1.faker.name.fullName();
                    email = "1234@gmail.com";
                    start_date = faker_1.faker.date.recent();
                    description = faker_1.faker.lorem.paragraph();
                    phone = faker_1.faker
                        .number.int({ min: 100000000, max: 999999999 })
                        .toString();
                    status_1 = faker_1.faker.helpers.shuffle(["Active", "Inactive"])[0];
                    department = faker_1.faker.helpers.shuffle([
                        "MANAGER",
                        "ROOM SERVICE",
                        "RECEPTIONIST",
                    ])[0];
                    password = "1234";
                    return [4 /*yield*/, bcryptjs.hash(password, 10)];
                case 1:
                    hashedPassword = _a.sent();
                    // Insertar el usuario usando Sequelize
                    return [4 /*yield*/, database_1.sequelize.query("INSERT INTO users (name, email, start_date, description, phone, status, department, password) \n       VALUES (?, ?, ?, ?, ?, ?, ?, ?)", {
                            replacements: [
                                name_2,
                                email,
                                start_date,
                                description,
                                phone,
                                status_1,
                                department,
                                hashedPassword,
                            ],
                        })];
                case 2:
                    // Insertar el usuario usando Sequelize
                    _a.sent();
                    console.log("User saved:", { name: name_2, email: email, start_date: start_date, description: description, phone: phone, status: status_1, department: department });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error("Error generating user:", error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// **Generate Bookings**
function generateBookings() {
    return __awaiter(this, void 0, void 0, function () {
        var name_3, date, check_in, check_out, request, status_2, rows, room_id, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    name_3 = faker_1.faker.name.fullName();
                    date = faker_1.faker.date.past();
                    check_in = faker_1.faker.date.recent();
                    check_out = faker_1.faker.date.future();
                    request = faker_1.faker.lorem.paragraph().slice(0, 255);
                    status_2 = faker_1.faker.helpers.shuffle([
                        "In progress",
                        "Check-In",
                        "Check-Out",
                    ])[0];
                    return [4 /*yield*/, database_1.sequelize.query("SELECT id FROM rooms ORDER BY RAND() LIMIT 1")];
                case 1:
                    rows = (_a.sent())[0];
                    if (!(Array.isArray(rows) && rows.length > 0)) return [3 /*break*/, 3];
                    room_id = rows[0].id;
                    // Insertar la reserva usando Sequelize
                    return [4 /*yield*/, database_1.sequelize.query("INSERT INTO bookings (name, date, check_in, check_out, request, status, room_id) \n         VALUES (?, ?, ?, ?, ?, ?, ?)", {
                            replacements: [name_3, date, check_in, check_out, request, status_2, room_id],
                        })];
                case 2:
                    // Insertar la reserva usando Sequelize
                    _a.sent();
                    console.log("Booking saved:", { name: name_3, date: date, check_in: check_in, check_out: check_out, request: request, status: status_2, room_id: room_id });
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error("Error generating booking:", error_4);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Función principal para ejecutar el seed
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var i, i, i, i, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 19, , 20]);
                    // Verificar que la conexión con la base de datos está funcionando
                    return [4 /*yield*/, database_1.sequelize.authenticate()];
                case 1:
                    // Verificar que la conexión con la base de datos está funcionando
                    _a.sent();
                    console.log("Conexión a la base de datos establecida.");
                    // Sincronizar la base de datos
                    return [4 /*yield*/, database_1.sequelize.sync({ alter: true })];
                case 2:
                    // Sincronizar la base de datos
                    _a.sent(); // Usar alter: true o force: true según sea necesario
                    console.log("Sincronización completada");
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < 10)) return [3 /*break*/, 6];
                    return [4 /*yield*/, generateRooms()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6:
                    i = 0;
                    _a.label = 7;
                case 7:
                    if (!(i < 10)) return [3 /*break*/, 10];
                    return [4 /*yield*/, generateContact()];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 7];
                case 10:
                    i = 0;
                    _a.label = 11;
                case 11:
                    if (!(i < 10)) return [3 /*break*/, 14];
                    return [4 /*yield*/, generateUser()];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13:
                    i++;
                    return [3 /*break*/, 11];
                case 14:
                    i = 0;
                    _a.label = 15;
                case 15:
                    if (!(i < 10)) return [3 /*break*/, 18];
                    return [4 /*yield*/, generateBookings()];
                case 16:
                    _a.sent();
                    _a.label = 17;
                case 17:
                    i++;
                    return [3 /*break*/, 15];
                case 18:
                    console.log("Seed data insertion completed.");
                    return [3 /*break*/, 20];
                case 19:
                    error_5 = _a.sent();
                    console.error("Error in seed data insertion:", error_5);
                    return [3 /*break*/, 20];
                case 20: return [2 /*return*/];
            }
        });
    });
}
main();

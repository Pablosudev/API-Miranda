"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./src/Utils/database");
require("dotenv/config");
const bcryptjs = __importStar(require("bcryptjs"));
const faker_1 = require("@faker-js/faker");
// **Generate Rooms**
function generateRooms() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const number = faker_1.faker.number.int({ min: 1, max: 500 });
            const price = parseFloat(faker_1.faker.commerce.price({ min: 80, max: 1000 }));
            const offer = faker_1.faker.number.int({ min: 0, max: 20 });
            const roomStatus = faker_1.faker.helpers.shuffle(["Available", "Booked"])[0];
            const type = faker_1.faker.helpers.shuffle([
                "Suite",
                "Double Bed",
                "Single Bed",
                "Double Superior",
            ])[0];
            const amenities = faker_1.faker.helpers
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
            yield database_1.sequelize.query(`INSERT INTO rooms (number, price, offer, roomStatus, type, amenities) 
       VALUES (?, ?, ?, ?, ?, ?)`, {
                replacements: [number, price, offer, roomStatus, type, amenities],
            });
            console.log("Room saved:", { number, price, offer, roomStatus, type, amenities });
        }
        catch (error) {
            console.error("Error generating room:", error);
        }
    });
}
// **Generate Contact**
function generateContact() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const date = new Date();
            const formattedDate = date.toISOString().slice(0, 10);
            const name = faker_1.faker.name.fullName();
            const email = faker_1.faker.internet.email();
            const phone = faker_1.faker
                .number.int({ min: 100000000, max: 999999999 })
                .toString();
            const subject = faker_1.faker.lorem.words(3);
            const comment = faker_1.faker.lorem.paragraph();
            // Insertar el contacto usando Sequelize
            yield database_1.sequelize.query(`INSERT INTO contacts (date, name, email, phone, subject, comment) 
       VALUES (?, ?, ?, ?, ?, ?)`, {
                replacements: [formattedDate, name, email, phone, subject, comment],
            });
            console.log("Contact saved:", { formattedDate, name, email, phone, subject, comment });
        }
        catch (error) {
            console.error("Error generating contact:", error);
        }
    });
}
// **Generate User**
function generateUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const name = faker_1.faker.name.fullName();
            const email = "1234@gmail.com";
            const start_date = faker_1.faker.date.recent();
            const description = faker_1.faker.lorem.paragraph();
            const phone = faker_1.faker
                .number.int({ min: 100000000, max: 999999999 })
                .toString();
            const status = faker_1.faker.helpers.shuffle(["Active", "Inactive"])[0];
            const department = faker_1.faker.helpers.shuffle([
                "MANAGER",
                "ROOM SERVICE",
                "RECEPTIONIST",
            ])[0];
            const password = "1234";
            const hashedPassword = yield bcryptjs.hash(password, 10);
            // Insertar el usuario usando Sequelize
            yield database_1.sequelize.query(`INSERT INTO users (name, email, start_date, description, phone, status, department, password) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, {
                replacements: [
                    name,
                    email,
                    start_date,
                    description,
                    phone,
                    status,
                    department,
                    hashedPassword,
                ],
            });
            console.log("User saved:", { name, email, start_date, description, phone, status, department });
        }
        catch (error) {
            console.error("Error generating user:", error);
        }
    });
}
// **Generate Bookings**
function generateBookings() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const name = faker_1.faker.name.fullName();
            const date = faker_1.faker.date.past();
            const check_in = faker_1.faker.date.recent();
            const check_out = faker_1.faker.date.future();
            const request = faker_1.faker.lorem.paragraph().slice(0, 255);
            const status = faker_1.faker.helpers.shuffle([
                "In progress",
                "Check-In",
                "Check-Out",
            ])[0];
            // Seleccionar una habitación aleatoria
            const [rows] = yield database_1.sequelize.query("SELECT id FROM rooms ORDER BY RAND() LIMIT 1");
            // Verificar que se encontró una habitación
            if (Array.isArray(rows) && rows.length > 0) {
                const room_id = rows[0].id;
                // Insertar la reserva usando Sequelize
                yield database_1.sequelize.query(`INSERT INTO bookings (name, date, check_in, check_out, request, status, room_id) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`, {
                    replacements: [name, date, check_in, check_out, request, status, room_id],
                });
                console.log("Booking saved:", { name, date, check_in, check_out, request, status, room_id });
            }
        }
        catch (error) {
            console.error("Error generating booking:", error);
        }
    });
}
// Función principal para ejecutar el seed
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Verificar que la conexión con la base de datos está funcionando
            yield database_1.sequelize.authenticate();
            console.log("Conexión a la base de datos establecida.");
            // Sincronizar la base de datos
            yield database_1.sequelize.sync({ alter: true }); // Usar alter: true o force: true según sea necesario
            console.log("Sincronización completada");
            // Ejecutar las funciones varias veces
            for (let i = 0; i < 10; i++) {
                yield generateRooms();
            }
            for (let i = 0; i < 10; i++) {
                yield generateContact();
            }
            for (let i = 0; i < 10; i++) {
                yield generateUser();
            }
            for (let i = 0; i < 10; i++) {
                yield generateBookings();
            }
            console.log("Seed data insertion completed.");
        }
        catch (error) {
            console.error("Error in seed data insertion:", error);
        }
    });
}
main();

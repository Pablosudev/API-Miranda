import { connectDB } from "./src/Utils/database";
import Room from "./src/Models/rooms";
import "dotenv/config";
import * as bcryptjs from "bcryptjs";
import { RoomsInterface } from "./src/Interfaces/RoomsInterface";

async function main() {
  const connection = await connectDB();
  const faker = require("faker");
  const mysql = require("mysql2/promise");

  // Rooms Faker
  async function generateRooms() {
    const number = faker.datatype.number({ min: 1, max: 500 });
    const price = parseFloat(faker.commerce.price({ min: 80, max: 1000 }));
    const offer = faker.datatype.number({ min: 0, max: 20 });
    const roomStatus = faker.helpers.shuffle(["Available", "Booked"])[0];
    const type = faker.helpers.shuffle([
      "Suite",
      "Double Bed",
      "Single Bed",
      "Double Superior",
    ])[0];
    const amenities = faker.helpers
      .shuffle(
        [
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
        { min: 1, max: 5 }
      )
      .join(",");

    const query = `
    INSERT INTO rooms (number, price, offer, roomStatus, type, amenities) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
    const room = new Room({
      number,
      price,
      offer,
      roomStatus,
      type,
      amenities,
    });

    await connection.execute(query, [
      number,
      price,
      offer,
      roomStatus,
      type,
      amenities,
    ]);
    console.log("Room saved:", {
      number,
      price,
      offer,
      roomStatus,
      type,
      amenities,
    });
  }

  for (let i = 0; i < 10; i++) {
    await generateRooms();
  }

  // Contact Faker
  async function generateContact() {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10);
    const name = faker.name.findName();
    const email = faker.internet.email();
    const phone = faker.datatype
      .number({ min: 100000000, max: 999999999 })
      .toString();
    const subject = faker.lorem.words(3);
    const comment = faker.lorem.paragraph();

    const query = `
      INSERT INTO contacts (date, name, email, phone, subject, comment) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    try {
      await connection.execute(query, [
        formattedDate,
        name,
        email,
        phone,
        subject,
        comment,
      ]);
      console.log("Contact saved:", {
        formattedDate,
        name,
        email,
        phone,
        subject,
        comment,
      });
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  }
  for (let i = 0; i < 10; i++) {
    await generateContact();
  }

  // User Faker
  async function generateUser() {
    const name = faker.name.findName();
    const email = "1234@gmail.com";
    const start_date = faker.date.recent();
    const description = faker.lorem.paragraph();
    const phone = faker.datatype
      .number({ min: 100000000, max: 999999999 })
      .toString();
    const status = faker.helpers.shuffle(["Active", "Inactive"])[0];
    const department = faker.helpers.shuffle([
      "MANAGER",
      "ROOM SERVICE",
      "RECEPTIONIST",
    ])[0];
    const password = "1234";
    const hashedPassword = await bcryptjs.hash(password, 10);

    const query = `
      INSERT INTO users (name, email, start_date, description, phone, status, department, password) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await connection.execute(query, [
      name,
      email,
      start_date,
      description,
      phone,
      status,
      department,
      hashedPassword,
    ]);
    console.log("User saved:", {
      name,
      email,
      start_date,
      description,
      phone,
      status,
      department,
    });
  }

  for (let i = 0; i < 10; i++) {
    await generateUser();
  }

  // Bookings Faker
  async function generateBookings() {
    const name = faker.name.findName();
    const date = faker.date.past();
    const check_in = faker.date.recent();
    const check_out = faker.date.future();
    const request = faker.lorem.paragraph().slice(0, 255);
    const status = faker.helpers.shuffle([
      "In progress",
      "Check-In",
      "Check-Out",
    ])[0];
    const [rows] = await connection.execute<RoomsInterface[]>("SELECT id FROM rooms ORDER BY RAND() LIMIT 1");

    // Verificar que se encontró una habitación
    if (Array.isArray(rows) && rows.length > 0) {
      const room_id = rows[0].id;
    // const price = parseFloat(faker.commerce.price({ min: 80, max: 1000 }));
    // const type = faker.helpers.shuffle([
    //   "Suite",
    //   "Double Bed",
    //   "Single Bed",
    //   "Double Superior",
    // ])[0];
    // const number = faker.datatype.number({ min: 1, max: 500 });

    // const [rows] = await connection.execute<RoomsInterface[]>(
    //   "SELECT * FROM rooms"
    // );
    // const randomRoom = rows[Math.floor(Math.random() * rows.length)];

    const query = `
      INSERT INTO bookings (name, date, check_in, check_out, request, status, room_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await connection.execute(query, [
      name,
      date,
      check_in,
      check_out,
      request,
      status,
      room_id,
    ]);
    console.log("Booking saved:", {
      name,
      date,
      check_in,
      check_out,
      request,
      status,
      room_id
    });
  }}

  for (let i = 0; i < 10; i++) {
    await generateBookings();
  }

  console.log("Seed data insertion completed.");
  connection.end();
}

main().catch((error) => console.error("Error in seed data insertion:", error));

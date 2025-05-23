import { faker } from "@faker-js/faker";
import connectDB from "./src/Utils/database";
import Room from "./src/Models/rooms";
import Contact from "./src/Models/contact";
import User from "./src/Models/users";
import Bookings from "./src/Models/bookings";
import "dotenv/config";
import * as bcryptjs from "bcryptjs";
import mongoose from "mongoose";
async function main() {
  try {
    await connectDB();

    // Generar Rooms
    for (let i = 0; i < 10; i++) {
      await generateRooms();
    }
    console.log("✅ 10 Rooms generadas");

    // Generar Contacts
    for (let i = 0; i < 10; i++) {
      await generateContact();
    }
    console.log("✅ 10 Contacts generados");

    // Generar Users
    for (let i = 0; i < 10; i++) {
      await generateUser();
    }
    console.log("✅ 10 Users generados");

    // Generar Bookings
    for (let i = 0; i < 10; i++) {
      await generateBookings();
    }
    console.log("✅ 10 Bookings generadas");

    await mongoose.connection.close(); // 👈 importante para terminar bien
    console.log("✅ Conexión cerrada");

    process.exit(0); // 👈 cierra el proceso de Node correctamente
  } catch (error) {
    console.error("❌ Error durante el seed:", error);
    await mongoose.connection.close(); // incluso si falla, cerramos
    process.exit(1);
  }

  //RoomsFaker
  async function generateRooms() {
    const number = faker.number.int({ min: 1, max: 500 });
    const price = faker.commerce.price({ min: 80, max: 1000 });
    const offer = faker.number.int({ min: 0, max: 20 });
    const roomStatus = faker.helpers.arrayElement(["Booked", "Available"]);
    const type = faker.helpers.arrayElement([
      "Suite",
      "Double Bed",
      "Single Bed",
      "Double Superior",
    ]);
    const amenities = faker.helpers.arrayElements(
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
    );
    const room = new Room({
      number,
      price,
      offer,
      roomStatus,
      type,
      amenities,
    });
    await room.save();
    console.log("Room saved:", room);
  }
  for (let i = 0; i < 10; i++) {
    await generateRooms();
  }
  //ContactFaker
  async function generateContact() {
    const date = faker.date.recent();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    // Formato de fecha: día/mes/año
    const formattedDate = `${day}/${month}/${year}`;
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const phone = faker.phone.number();
    const subject = faker.lorem.words(3);
    const comment = faker.lorem.paragraph();
    const contact = new Contact({
      date:formattedDate,
      name,
      email,
      phone,
      subject,
      comment,
    });
    await contact.save();
  }
  
  //User Faker
  async function generateUser() {
    const name = faker.person.fullName();
    const email = "1234@gmail.com";
    const start_date = faker.date.recent();
    const description = faker.lorem.paragraph();
    const phone = faker.phone.number();
    const status = faker.helpers.arrayElement(["Active", "Inactive"]);
    const department = faker.helpers.arrayElement(["MANAGER", "ROOM SERVICE", "RECIPTIONIST"]);
    const password = "1234";
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({
      name,
      email,
      start_date,
      description,
      phone,
      status,
      department,
      password: hashedPassword,
    });
    await user.save();
  }
  for (let i = 0; i < 10; i++) {
    await generateUser();
  }
  //Bookings Faker
  async function generateBookings() {
    const name = faker.person.fullName();
    const date = faker.date.past();
    const check_in = faker.date.recent();
    const check_out = faker.date.future();
    const request = faker.lorem.paragraph();
    const status = faker.helpers.arrayElement([
      "In Progress",
      "Check-In",
      "Check-Out",
    ]);
    const price = faker.commerce.price({ min: 80, max: 1000 });
    const type = faker.helpers.arrayElement([
      "Suite",
      "Double Bed",
      "Single Bed",
      "Double Superior",
    ]);
    const number = faker.number.int({ min: 1, max: 500 });
    const rooms = await Room.find();
    const randomRoom = faker.helpers.arrayElement(rooms)
    const bookings = new Bookings({
      name,
      date,
      check_in,
      check_out,
      request,
      price,
      number,
      status,
      type,
      room_id: randomRoom._id
    });
    await bookings.save();
  }
  for (let i = 0; i < 10; i++) {
    await generateBookings();
  }
}
main();







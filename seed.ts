import { sequelize } from "./src/Utils/database"; 
import "dotenv/config";  
import * as bcryptjs from "bcryptjs";  
import { faker } from '@faker-js/faker';

// **Generate Rooms**
async function generateRooms() {
  try {
    const number = faker.number.int({ min: 1, max: 500 });
    const price = parseFloat(faker.commerce.price({ min: 80, max: 1000 }));
    const offer = faker.number.int({ min: 0, max: 20 });
    const roomStatus = faker.helpers.shuffle(["Available", "Booked"])[0];
    const type = faker.helpers.shuffle([
      "Suite",
      "Double Bed",
      "Single Bed",
      "Double Superior",
    ])[0];
    const amenities = faker.helpers
      .arrayElements(
        [
          "FREE WIFI",
          "TV LED",
          "2 BATHROOM",
          "AC",
          "3 BED SPACE",
          "COFFEE SET",
          "BATHUP",
          "TOWEL",
          "SHOWER",
        ],
        { min: 1, max: 5 }
      )
      .join(",");

    await sequelize.query(
      `INSERT INTO rooms (number, price, offer, roomStatus, type, amenities) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      {
        replacements: [number, price, offer, roomStatus, type, amenities],
      }
    );
    console.log("Room saved:", { number, price, offer, roomStatus, type, amenities });
  } catch (error) {
    console.error("Error generating room:", error);
  }
}

// **Generate Contact**
async function generateContact() {
  try {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10);
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const phone = faker
      .number.int({ min: 100000000, max: 999999999 })
      .toString();
    const subject = faker.lorem.words(3);
    const comment = faker.lorem.paragraph();

    // Insertar el contacto usando Sequelize
    await sequelize.query(
      `INSERT INTO contacts (date, name, email, phone, subject, comment) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      {
        replacements: [formattedDate, name, email, phone, subject, comment],
      }
    );

    console.log("Contact saved:", { formattedDate, name, email, phone, subject, comment });
  } catch (error) {
    console.error("Error generating contact:", error);
  }
}

// **Generate User**
async function generateUser() {
  try {
    const name = faker.name.fullName();
    const email = "1234@gmail.com";
    const start_date = faker.date.recent();
    const description = faker.lorem.paragraph();
    const phone = faker
      .number.int({ min: 100000000, max: 999999999 })
      .toString();
    const status = faker.helpers.shuffle(["Active", "Inactive"])[0];
    const department = faker.helpers.shuffle([
      "MANAGER",
      "ROOM SERVICE",
      "RECEPTIONIST",
    ])[0];
    const password = "1234";
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Insertar el usuario usando Sequelize
    await sequelize.query(
      `INSERT INTO users (name, email, start_date, description, phone, status, department, password) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      {
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
      }
    );

    console.log("User saved:", { name, email, start_date, description, phone, status, department });
  } catch (error) {
    console.error("Error generating user:", error);
  }
}

// **Generate Bookings**
async function generateBookings() {
  try {
    const name = faker.name.fullName();
    const date = faker.date.past();
    const check_in = faker.date.recent();
    const check_out = faker.date.future();
    const request = faker.lorem.paragraph().slice(0, 255);
    const status = faker.helpers.shuffle([
      "In progress",
      "Check-In",
      "Check-Out",
    ])[0];

    // Seleccionar una habitación aleatoria
    const [rows]: any = await sequelize.query(
      "SELECT id FROM rooms ORDER BY RAND() LIMIT 1"
    );

    // Verificar que se encontró una habitación
    if (Array.isArray(rows) && rows.length > 0) {
      const room_id = rows[0].id;

      // Insertar la reserva usando Sequelize
      await sequelize.query(
        `INSERT INTO bookings (name, date, check_in, check_out, request, status, room_id) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        {
          replacements: [name, date, check_in, check_out, request, status, room_id],
        }
      );

      console.log("Booking saved:", { name, date, check_in, check_out, request, status, room_id });
    }
  } catch (error) {
    console.error("Error generating booking:", error);
  }
}

// Función principal para ejecutar el seed
async function main() {
  try {
    // Verificar que la conexión con la base de datos está funcionando
    await sequelize.authenticate(); 
    console.log("Conexión a la base de datos establecida.");

    // Sincronizar la base de datos
    await sequelize.sync({ alter: true }); // Usar alter: true o force: true según sea necesario
    console.log("Sincronización completada");

    // Ejecutar las funciones varias veces
    for (let i = 0; i < 10; i++) {
      await generateRooms();
    }

    for (let i = 0; i < 10; i++) {
      await generateContact();
    }

    for (let i = 0; i < 10; i++) {
      await generateUser();
    }

    for (let i = 0; i < 10; i++) {
      await generateBookings();
    }

    console.log("Seed data insertion completed.");
  } catch (error) {
    console.error("Error in seed data insertion:", error);
  }
}

main();

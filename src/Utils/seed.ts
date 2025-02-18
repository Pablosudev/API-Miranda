import { faker } from "@faker-js/faker";
import connectDB from "../Utils/database";
import Room from "../Models/rooms";
import Contact from "../Models/contact";

async function main() {
  await connectDB();

  //RoomsFaker
  async function generateRooms() {
    const number = faker.number.int({ min: 1, max: 500 });
    const price = faker.commerce.price({ min: 80, max: 1000 });
    const offer = faker.number.int({ min: 0, max: 20 });
    const status = faker.helpers.arrayElement(["Booked", "Available"]);
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
      price: parseFloat(price),
      offer,
      status,
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
    const fullName = faker.person.fullName();
    const email = faker.internet.email();
    const phone = faker.phone.number();
    const subject = faker.lorem.words(3);
    const comment = faker.lorem.paragraph();

    const contact = new Contact({
      date,
      fullName,
      email,
      phone,
      subject,
      comment,
    });
    await contact.save();
  }
  for (let i = 0; i < 10; i++) {
    await generateContact();
  }
}

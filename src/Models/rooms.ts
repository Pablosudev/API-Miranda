import mongoose from "mongoose";
import { RoomsInterface } from "../Interfaces/RoomsInterface";

// Lista de valores permitidos para el campo `amenities`
const allowedAmenities = [
  "FREE WIFI",
  "TV LED",
  "2 BATHROOM",
  "AC",
  "3 BED SPACE",
  "COFEE SET",
  "BATHUP",
  "TOWEL",
  "SHOWER",
];

const RoomSchema = new mongoose.Schema<RoomsInterface>({
  number: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offer: {
    type: Number,
    required: true,
  },
  roomStatus: {
    type: String,
    required: true,
    enum: ["Booked", "Available"], // Esto es válido porque es un solo valor
  },
  type: {
    type: String,
    required: true,
    enum: ["Suite", "Double Superior", "Single Bed", "Double Bed"], // Esto es válido porque es un solo valor
  },
  amenities: {
    type: [String], // Asegúrate de que sea un array de strings
    required: true,
    validate: {
      validator: function (amenitiesArray: string[]) {
        // Verifica que todos los elementos del array estén en la lista de valores permitidos
        return amenitiesArray.every((amenity) => allowedAmenities.includes(amenity));
      },
      message: (props) => `${props.value} contiene valores no permitidos en el campo "amenities".`,
    },
  },
});

const Room = mongoose.model('Room', RoomSchema);
export const RoomModel = mongoose.model<RoomsInterface>('Rooms', RoomSchema);
export default Room;
import mongoose from "mongoose";
import { RoomsInterface } from "../Interfaces/RoomsInterface";

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
  status: {
    type: String,
    required: true,
    enum: ["Booked", "Available"],
  },
  type: {
    type: String,
    required: true,
    enum: ["Suite", "Double Superior", "Single Bed", "Double Bed"],
  },
  amenities: {
    type: String,
    required: true,
    enum: [
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
  },
});

export const RoomModel = mongoose.model<RoomsInterface>('Rooms', RoomSchema);
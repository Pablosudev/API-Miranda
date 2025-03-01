import mongoose from "mongoose";

 export interface RoomsInterface extends mongoose.Document {
  number: number;
  _id: string;
  price: number;
  offer: number;
  roomStatus: string;
  type: string;
  amenities: string[];
}


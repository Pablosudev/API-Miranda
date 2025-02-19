import mongoose from "mongoose";

 export interface RoomsInterface extends mongoose.Document {
  number: number;
  id: string;
  price: number;
  offer: number;
  status: string;
  type: string;
  amenities: string[];
}


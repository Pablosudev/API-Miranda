import mongoose from "mongoose";

interface RoomsInterface extends mongoose.Document {
  number: number;
  id: string;
  price: number;
  offer: number;
  status: string;
  type: string;
  amenities: string ;
}
export {RoomsInterface}
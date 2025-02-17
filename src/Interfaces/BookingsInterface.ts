import { RoomsInterface } from "./RoomsInterface";
import mongoose from "mongoose";
interface BookingsInterface extends mongoose.Document{
    name: string;
    id: string;
    date: string;
    check_in: string;
    check_out: string;
    request: string;
    room:Partial<RoomsInterface>;
    type: string;
    number: number;
    status: string;
    price: number;
  }
  export {BookingsInterface}
  
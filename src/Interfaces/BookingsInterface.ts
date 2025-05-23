import { RoomsInterface } from "./RoomsInterface";
import mongoose from "mongoose";
interface BookingsInterface extends mongoose.Document{
    name: string;
    _id: string;
    date: string;
    check_in: string;
    check_out: string;
    request: string;
    status: string;
    room_id:Partial<RoomsInterface>;
    type: string;
    number: number;
  }
  export {BookingsInterface}
  
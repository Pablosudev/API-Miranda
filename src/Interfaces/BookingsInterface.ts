import { RoomsInterface } from "./RoomsInterface";
import mongoose from "mongoose";
interface BookingsInterface extends mongoose.Document{
    name: string;
    _id: string;
    date: Date;
    check_in: string;
    check_out: string;
    request: string;
    status: string;
    room:Partial<RoomsInterface>;
    type: string;
    number: number;
  }
  export {BookingsInterface}
  
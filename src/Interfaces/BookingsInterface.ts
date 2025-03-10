import { RoomsInterface } from "./RoomsInterface";
import mongoose from "mongoose";
interface BookingsInterface extends mongoose.Document{
    name: string;
    id: number;
    date: Date;
    check_in: Date;
    check_out: Date;
    request: string;
    status: string;
    room:Partial<RoomsInterface>;
  }
  export {BookingsInterface}
  
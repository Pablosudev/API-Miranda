
import { RowDataPacket } from "mysql2";

 export interface RoomsInterface extends RowDataPacket {
  number: number;
  _id: string;
  price: number;
  offer: number;
  roomStatus: string;
  type: string;
  amenities: string[];
}


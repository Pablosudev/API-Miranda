import { RoomsInterface } from "./RoomsInterface";

export interface BookingsInterface{
    name: string;
    id?: number;
    date: Date;
    check_in: Date;
    check_out: Date;
    request: string;
    status: string;
    roomId:number;
  }
 
  
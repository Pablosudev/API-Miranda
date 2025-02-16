import { RoomsInterface } from "./RoomsInterface";

export interface BookingsInterface {
    name: string;
    id: number;
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
  
  
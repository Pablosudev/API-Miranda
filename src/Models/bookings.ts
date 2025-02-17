import mongoose from "mongoose";
import { BookingsInterface } from "../Interfaces/BookingsInterface";
import { RoomModel } from "./rooms";

const BookingsSchema = new mongoose.Schema<BookingsInterface>({
name:{
    type: String,
    required: true 
},
date:{
    type: String,
    required: true
},
check_in:{
    type: String,
    required: true
},
check_out:{
    type: String,
    required: true
},
request:{
    type: String,
    required: true
},
type:{
    type: String,
    required: true 
},
number:{
    type: Number,
    required: true
},
status:{
    type: String,
    required: true,
    enum: ['Check-Out', 'Check-In', 'In Progress']
},
price:{
    type: Number,
    required: true
},
room:{
    type: RoomModel.schema,
    required: true

}
})
export const BookingModel = mongoose.model<BookingsInterface>('Bookings', BookingsSchema);
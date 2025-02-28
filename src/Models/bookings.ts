import mongoose from "mongoose";
import { BookingsInterface } from "../Interfaces/BookingsInterface";


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
    type: Object,
    required: true,

}
})
const Bookings = mongoose.model('Bookings', BookingsSchema);
export const BookingModel = mongoose.model<BookingsInterface>('Bookings', BookingsSchema);
export default Bookings;
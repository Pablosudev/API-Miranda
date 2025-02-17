import mongoose from "mongoose";
import { ContactsInterface } from "../Interfaces/ContactInterface";


const ContactSchema = new mongoose.Schema<ContactsInterface>({
    date:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }

})
export const ContactModel = mongoose.model<ContactsInterface>('Contact', ContactSchema)
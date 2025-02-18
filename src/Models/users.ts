import mongoose from "mongoose";
import { UsersInterface } from "../Interfaces/UsersInterface";


const UsersSchema = new mongoose.Schema<UsersInterface>({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true 
    },
    start_date: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true 
    },
    phone:{
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Inactive']
    },
    department: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})
const Users = mongoose.model('Users', UsersSchema)
export const UsersModel = mongoose.model<UsersInterface>('Users', UsersSchema)
export default Users
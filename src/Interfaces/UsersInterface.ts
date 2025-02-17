import mongoose from "mongoose"

interface UsersInterface extends mongoose.Document{
    name: string,
    id: string,
    email: string,
    start_date: string,
    description: string,
    phone: string,
    status: string,
    department: string, 
    password: string 
}
 export {UsersInterface}

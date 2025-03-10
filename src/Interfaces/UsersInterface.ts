import mongoose from "mongoose"

interface UsersInterface{
    id?: number,
    name: string,
    email: string,
    start_date: Date,
    description: string,
    phone: string,
    status: string,
    department: string, 
    password: string 
}
 export {UsersInterface}


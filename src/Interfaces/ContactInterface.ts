import mongoose from "mongoose"

interface ContactsInterface extends mongoose.Document{
    date: string,
    _id: string,
    name:string,
    email:string,
    phone: string,
    subject: string,
    comment: string, 
}
export {ContactsInterface}




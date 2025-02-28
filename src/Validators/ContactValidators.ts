import { error } from "console";
import { ContactsInterface } from "../Interfaces/ContactInterface";
import { Response, Request } from "express";


const validDate = (date: string): boolean => {
  const parseDate = new Date(date);
  return !isNaN(parseDate.getTime());
};
const validEmail = (email: string ): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email)
}
const validContact = (contact: string): boolean => {
  const phoneRegex = /^[0-9]{9,12}$/;
  return phoneRegex.test(contact);
  };


export const validateContact = (req: Request, res: Response) => {
  const {date, _id, name, email, phone, subject, comment }= req.body  as ContactsInterface;
  if(!validDate(date)){
    return res.status(400).json({error: 'Invalid Date'})
  }
  if(typeof _id !== 'string' || _id === null){
    return res.status(400).json({error: 'Invalid id'})
  }
  if(typeof name !== 'string' || name.length <= 3){
    return res.status(400).json({error: 'Invalid name'})
  }
  if(!validEmail(email)){
    return res.status(400).json({error: 'Invalid email'})
  }
  if(!validContact(phone)){
    return res.status(400).json({error: 'Invalid phone'})
  }
  if(typeof subject !== 'string'){
    return res.status(400).json({error: 'Invalid subject'})
  }
  if(typeof comment !== 'string'){
    return res.status(400).json({error: 'Invalid phone'})
  }
}
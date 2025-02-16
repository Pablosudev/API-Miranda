import { BookingsInterface } from "../Interfaces/BookingsInterface";
import { Response, Request } from "express";


const validDate = (date: string): boolean => {
  const parseDate = new Date(date);
  return !isNaN(parseDate.getTime());
};

export const validateBookings = (req:Request, res: Response) => {
  const {name, id, date, check_in, check_out, request, type, number ,status, price, room} = req.body as BookingsInterface;
  if(typeof name !== 'string' || name.length <= 3){
    return res.status(400).json({error: 'Invalid name'})
  }
  if(typeof id !== 'number' || id === null){
    return res.status(400).json({error: 'Invalid Id'})
  }
  if(!validDate(date) || validDate === null){
    return res.status(400).json({error: 'Invalid date'})
  }
  if(!validDate(check_in) || validDate === null){
    return res.status(400).json({error: 'Invalid checkIn'})
  }
  if(!validDate(check_out) || validDate === null){
    return res.status(400).json({error: 'Invalid checkOut'})
  }
  if(typeof request !== 'string'){
    return res.status(400).json({error: 'Invalid request'})
  }
  if(typeof type !== 'string' || type === null ||
    type !== 'In Progress' && type !== 'Check Out' && type !== 'Check In'
  ){
    return res.status(400).json({error: 'Invalid type'})
  }
  if(typeof number !== 'number' || number === null){
    return res.status(400).json({error: 'Invalid number room'})
  }
  if(typeof status !== 'string' || status === null ||
    type !== 'In Progress' && type !== 'Check Out' && type !== 'Check In'
  ){
    return res.status(400).json({error: 'Invalid status'})
  }
  if(typeof price !== 'number' || price === null ){
    return res.status(400).json({error: 'Invalid price'})
  }
  if(typeof room  !== 'object' || room === null){
    return res.status(400).json({error: 'Invalid room'})
  }
}

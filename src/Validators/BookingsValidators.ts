import { BookingsInterface } from "../Interfaces/BookingsInterface";
import { Response, Request } from "express";

export const validateBookings = (req:Request, res: Response) => {
  const {name, id, date, check_in, check_out, request,status, roomId} = req.body as BookingsInterface;
  if(typeof name !== 'string' || name.length <= 3){
    return res.status(400).json({error: 'Invalid name'})
  }
  if(typeof id !== 'number' || id === null){
    return res.status(400).json({error: 'Invalid Id'})
  }
  const parsedDate = new Date(date);
  if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) {
    return res.status(400).json({ error: 'Invalid date' });
  }

  
  const parsedCheckIn = new Date(check_in);
  if (!(parsedCheckIn instanceof Date) || isNaN(parsedCheckIn.getTime())) {
    return res.status(400).json({ error: 'Invalid checkIn' });
  }

  const parsedCheckOut = new Date(check_out);
  if (!(parsedCheckOut instanceof Date) || isNaN(parsedCheckOut.getTime())) {
    return res.status(400).json({ error: 'Invalid checkOut' });
  }
  if(typeof request !== 'string'){
    return res.status(400).json({error: 'Invalid request'})
  }
  
  if(typeof status !== 'string' || status === null ||
    status !== 'In Progress' && status !== 'Check Out' && status !== 'Check In'){
    return res.status(400).json({error: 'Invalid status'})
  }
  if(typeof roomId  !== 'number' ){
    return res.status(400).json({error: 'Invalid room'})
  }
  
}
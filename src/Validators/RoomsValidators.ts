import { RoomsInterface } from "../Interfaces/RoomsInterface";
import { Response, Request } from "express";

export const validateRooms = (req: Request, res: Response,) => {
  const { number, id, price, offer, status, type, amenities } =
    req.body as RoomsInterface;
  if (typeof number !== "number" || number === 0) {
    return res.status(400).json({ error: "Invalid number room" });
  }
  if (typeof id !== "string" || id === null) {
    return res.status(400).json({ error: "Invalid Id" });
  }
  if (typeof price !== "number" || price === 0) {
    return res.status(400).json({ error: "Invalida price" });
  }
  if (typeof offer !== "number") {
    return res.status(400).json({ error: "Invalid offer" });
  }
  if (
    typeof status !== "string" ||
    (status !== "Booked" && status !== "Available")
  ) {
    return res.status(400).json({ error: "Invalid status room" });
  }
  if (
    typeof type !== "string" ||
    type.length === 0 ||
    (type !== "Suite" &&
      type !== "Double Superior" &&
      type !== "Single Bed" &&
      type !== "Dobule Bed")
  ) {
    return res.status(400).json({ error: "Invalid type room" });
  }
  if(typeof amenities !== 'string' || amenities.length === 0){
    return res.status(400).json({error: 'Invalid amenities'})
  }
};

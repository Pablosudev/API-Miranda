import { RoomsInterface } from "../Interfaces/RoomsInterface";
import { Response, Request } from "express";

export const validateRooms = (req: Request, res: Response) => {
  const { number, price, offer, roomStatus, type, amenities } =
    req.body as RoomsInterface;
  if (typeof number !== "number" || number === 0) {
    return res.status(400).json({ error: "Invalid number room" });
  }
  if (typeof price !== "number" || price === 0) {
    return res.status(400).json({ error: "Invalida price" });
  }
  if (typeof offer !== "number") {
    return res.status(400).json({ error: "Invalid offer" });
  }
  if (
    typeof roomStatus !== "string" ||
    (roomStatus !== "Booked" && roomStatus !== "Available")
  ) {
    return res.status(400).json({ error: "Invalid status room" });
  }
  if (
    typeof type !== "string" ||
    type.length === 0 ||
    (type !== "Suite" &&
      type !== "Double Superior" &&
      type !== "Single Bed" &&
      type !== "Double Bed")
  ) {
    return res.status(400).json({ error: "Invalid type room" });
  }
  if (
    !Array.isArray(amenities) ||
    !amenities.every((item) => typeof item === "string")
  ) {
    return res.status(400).json({ error: "Invalid amenities" });
  }
};

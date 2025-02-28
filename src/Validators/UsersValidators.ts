import { Request, Response } from "express";
import { UsersInterface } from "../Interfaces/UsersInterface";

const validEmaill = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

// const validDate = (date: string): boolean => {
//   const parseDate = new Date(date);
//   return !isNaN(parseDate.getTime());
// };
const validContact = (contact: string): boolean => {
  const phoneRegex = /^[0-9]{9,12}$/;
  return phoneRegex.test(contact);
};

export const validateUser = (req: Request, res: Response) => {
  const {
    name,
    email,
    start_date,
    description,
    phone,
    status,
    department,
    password,
  } = req.body as UsersInterface;

  if (typeof name !== "string" || name.length === 0) {
    return res
      .status(400)
      .json({ error: "Name is required and must be a non-empt" });
  }
  if (!validEmaill(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  if (typeof start_date !== "string") {
    return res.status(400).json({ error: "Invalid date format" });
  }
  if (typeof description !== "string" || description.length === 0) {
    return res.status(400).json({ error: "Invalid description" });
  }
  if (typeof phone !== "string") {
    return res.status(400).json({ error: "Invalid phone" });
  }
  if (
    typeof status !== "string" ||
    status.length === 0 ||
    (status !== "Active" && status !== "Inactive")
  ) {
    return res.status(400).json({ error: "Invalid status" });
  }
  if (typeof department !== "string" || department.length <= 0) {
    return res.status(400).json({ error: "Invalid departmanet" });
  }
  if(typeof password !== "string" || password.length <=0){
    return res.status(400).json({ error: "Invalid password" });
  }
};

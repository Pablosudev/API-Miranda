import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import admin from "../Data/admin.json";
import { AdminInterface } from "../Interfaces/AdminInterface";

export const loginRouter = Router();

loginRouter.post("/api/v1/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const adminValue: AdminInterface | undefined = admin.find((admin) => admin.email === email);

    if (!adminValue) {
      res.status(400).send("Admin not found");
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, adminValue.password);

    if (isPasswordValid === null) {
      res.status(400).send("Invalid password");
      return;
    }

    if (process.env.TOKEN_SECRET) {
      const token = jwt.sign({ email: adminValue.email }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
      res.status(200).json({ token });
    } else {
      res.status(500).send("TOKEN_SECRET is not defined");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

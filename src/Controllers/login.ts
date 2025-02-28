import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { UsersModel } from "../Models/users";

export const loginRouter = Router();

loginRouter.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const userValue =  await UsersModel.findOne({ email });

    if (!userValue) {
      res.status(400).send("Invalid user or password");
      return;
    }

    const isPasswordValid = await bcryptjs.compare(password, userValue.password);

    if (!isPasswordValid) {
      res.status(400).send("Invalid user or password");
      return;
    }

    if (process.env.TOKEN_SECRET) {
      const token = jwt.sign({ email: userValue.email }, process.env.TOKEN_SECRET, { expiresIn: "1year" });
      res.status(200).json({ token });
    } else {
      res.status(500).send("TOKEN_SECRET is not defined");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

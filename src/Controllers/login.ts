import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { sequelize } from "../Utils/database";
import Users from "../Models/users";



export const loginRouter = Router();

loginRouter.post("/", async (req: Request, res: Response): Promise<void> => {
  console.log('Solicitud post recibida')
  try {
    const { email, password } = req.body;
    console.log("Users model: ", Users);
    const userValue =  await Users.findOne({ where: {email} });

    if (!userValue) {
      console.log('Usuario no encontrado')
      res.status(400).send("Invalid user or password");
      return;
    }
    console.log('Usuario encontrado', userValue)
    console.log(userValue.password)
    const isPasswordValid = await bcryptjs.compare(password, userValue.password);

    if (!isPasswordValid) {
      res.status(400).send("Invalid user or password");
      return;
    }

    if (process.env.TOKEN_SECRET) {
      console.log('Generando Token')
      const token = jwt.sign({ email: userValue.email }, process.env.TOKEN_SECRET, { expiresIn: "20m" });
      res.status(200).json({ token });
    } else {
      res.status(500).send("TOKEN_SECRET is not defined");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

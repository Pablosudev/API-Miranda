import { Request, Response, Router } from "express";
import { AdminInterface } from "../Interfaces/AdminInterface";
import admin from "../Data/admin.json";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginRouter = Router();

loginRouter.post("/api/v1/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  const adminValue: AdminInterface[] = admin.filter((admin) => admin.email === email);
  if (adminValue.length === 0) {
    res.status(400).send("Admin no encontrado");
  }
  if (!process.env.TOKEN_SECRET) {
    res.status(500).send(" TOKEN_SECRET no está definido");
  }

  const validPassword = bcrypt
    .compare(password, adminValue[0].password)
    .then((validPassword) => {
      if (validPassword === false) {
        
        return res
          .status(400)
          .send({ token: "Usuario o contraseña incorrectos" });
      }
      const token = jwt.sign(
        { email: adminValue[0].email },
        process.env.TOKEN_SECRET as string,
        { expiresIn: "1h" }
      );
      res.status(200).send({ token: token });
    });
});

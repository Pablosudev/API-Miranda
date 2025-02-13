import { Request, Response, Router } from "express";
import { AdminInterface } from "../Interfaces/AdminInterface";
import admins from '../Data/admin.json'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const loginRouter = Router();

loginRouter.post('', (req: Request, res: Response) => {
    const { email, password } = req.body;

    const admin: AdminInterface[] = admins.filter(u => u.email === email);
    if (admin.length === 0) {
        res.status(400).send('Admin no encontrado');
    }
    if (!process.env.TOKEN_SECRET) {
        res.status(500).send(' TOKEN_SECRET no está definido');
   }
  
    const validPassword = bcrypt.compare(password, admin[0].password).then((result) => {
        console.log(result);
        if (!result  === false) {
            res.status(400).send({token: "USuario o contraseña incorrectos"});
            return;
        }
        else {
            const token = jwt.sign({ email: admin[0].email }, process.env.TOKEN_SECRET as string, { expiresIn: '1h' });
            res.status(200).send({token: token});
        }
    })
})
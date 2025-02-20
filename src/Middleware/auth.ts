import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void | Promise<void> => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });
    } else {
        try {
            jwt.verify(token, process.env.TOKEN_SECRET || "");
            next();
        } catch (error) {
            res.status(403).json({ message: 'Token inválido o expirado' });
        }
    }


};
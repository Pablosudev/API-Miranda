import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface JwtPayload {
    userId: string;
    role?: string; 
}


declare module 'express' {
    interface Request {
        user?: JwtPayload; 
    }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET || "") as JwtPayload;
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
};
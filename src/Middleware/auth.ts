import { Response, Request, NextFunction } from 'express';
import { AdminInterface } from '../Interfaces/AdminInterface';
import jwt from 'jsonwebtoken';


declare module 'express' {
    interface Request {
        admin?: AdminInterface;
    }
}

function validateToken(req: Request, res: Response, next: NextFunction) {
    
    const accessToken = req.headers['authorization'] || req.query.accessToken;

    if (!accessToken || typeof accessToken !== 'string') {
        return res.status(403).json({ error: 'Access denied: Token is missing or invalid' });
    }

    const tokenSecret = process.env.TOKEN_SECRET;
    if (!tokenSecret) {
        console.error('Server configuration error: TOKEN_SECRET is not defined');
        return res.status(500).json({ error: 'Server configuration error: TOKEN_SECRET is not defined' });
    }

    jwt.verify(accessToken, tokenSecret, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err.message);
            return res.status(403).json({ error: 'Access denied: Token expired or invalid' });
        }

        const admin = decoded as AdminInterface;
        if (!admin || !admin.email) {
            return res.status(403).json({ error: 'Access denied: Token does not contain valid admin data' });
        }
 
        req.admin = admin;
        next();
    });
}

export default validateToken;
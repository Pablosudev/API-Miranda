import { Response, Request, NextFunction} from 'express'
import { AdminInterface } from '../Interfaces/AdminInterface';
import jwt from 'jsonwebtoken';
declare module 'express' {
    interface Request {
        admin?: AdminInterface; // Asegúrate de que AdminInterface esté correctamente definido
    }
}

function validateToken(req: Request, res: Response, next: NextFunction){
    const accessToken = req.headers['authorization'] || req.query.accessToken;

    
    if (!accessToken || typeof accessToken !== 'string') {
        return res.status(403).send('Access denied');
    }

    const tokenSecret = process.env.TOKEN_SECRET;
    if (!tokenSecret) {
        return res.status(500).send('Server configuration error: TOKEN_SECRET is not defined');
    }

    jwt.verify(accessToken, tokenSecret, (err, decoded) => {
        if (err) {
            return res.status(403).send('Access denied: Token expired or invalid');
        
        } 
        const admin = decoded as AdminInterface;
        if (!admin) {
            return res.status(403).send('Access denied: Token does not contain valid admin data');
        } else {
            req.admin = admin;
            next();
        }
    });
}
export default validateToken;
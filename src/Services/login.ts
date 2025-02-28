import { AdminInterface } from '../Interfaces/AdminInterface';
import admins from '../Data/admin.json';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';



export class AuthService {
    
    static async login(email: string, password: string): Promise<string | null> {
        
        const admin: AdminInterface[] = admins.filter(u => u.email === email);
        if (admin.length === 0) {
            return null; 
        }

        const validPassword = await bcryptjs.compare(password, admin[0].password);
        if (!validPassword) {
            return null; 
        }

        const token = jwt.sign(
            { email: admin[0].email },
            process.env.TOKEN_SECRET as string,
            { expiresIn: '1h' } 
        );

        return token;
        
    }
}


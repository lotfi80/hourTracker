import jwt from 'jsonwebtoken';
import  dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

export function issueJwt (user : any){
    const payload = {
        user: {
            id: user._id
        },
    }    

    return jwt.sign(payload, JWT_SECRET || ""  , {expiresIn: '1h'})
    
;
}

export function verifyJwt(token: string) {
    if (!token) return null;
    try {
        return jwt.verify(token, JWT_SECRET || "" );
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
}
import {verifyJwt} from '../libs/jwt';
import {Request, Response , NextFunction}  from 'express';

export function authorizeJwt(req : Request, res : Response, next : NextFunction){
    console.log(req.cookies);
    const token = req.cookies.jwt;
    if (!token){
        return res.status(401).json({msg: 'Unauthorized'});
    }

    const user = verifyJwt(token);
    if (!user){
        return res.status(401).json({msg: 'Unauthorized'});
    }
    // req.user = user;
    next();
}
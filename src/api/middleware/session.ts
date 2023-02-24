import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../utils/jwt.handle';

interface RequestWithUser extends Request {
    user?: string|JwtPayload;
}

const checkToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    
    try {
        const tokenByUser = req.headers.authorization||'';
        // const token = tokenByUser.split(' ').pop;//[Bearer,token]
        const token = tokenByUser.split(' ')[1];//[Bearer,token]
        const isUSer = verifyToken(`${token}`) as {id:String} //{id:1,iat:123456,exp:123456}
        if(!isUSer){
            res.status(401).send({message:'TOKEN_NOT_VALID'});
        }else{
            // res.status(201).send(
            //     {
            //         message: "TOKEN_VALID"
            //     }
            // );            
            req.user=isUSer;
            next();
        }
        
        
    } catch (error) {
      res.status(400).send({message:'SESSION_NOT_VALID'});
    }
}
export { checkToken };
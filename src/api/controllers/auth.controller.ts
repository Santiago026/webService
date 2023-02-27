import { Request, Response } from 'express';
import { registerNewUser,loginUser } from '../services/auth.service' 

const resgisterCtrl = async (req: Request, res: Response) => {
    const responseUSer = await registerNewUser(req.body);
    res.status(201).send(responseUSer);
};

const loginCtrl = async (req: Request, res: Response) => {
    const {email,password} = req.body;
    const responseCredentials = await loginUser({email,password});
    
    //We make the description of the error in the service
    if(responseCredentials.message==="NOT_FOUND_USER"){
        res.status(404).send(responseCredentials);
    }else if(responseCredentials.message==="WRONG_PASSWORD"){
        res.status(401).send(responseCredentials);
    }else{
        res.status(201).send(responseCredentials);
    } 
};
export { resgisterCtrl, loginCtrl };
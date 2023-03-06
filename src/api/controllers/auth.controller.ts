import { Request, Response } from 'express';
import { registerNewUser,deleteUser,loginUser } from '../services/auth.service' 

const resgisterCtrl = async (req: Request, res: Response) => {
    try{

        const responseUSer = await registerNewUser(req.body);
        res.status(201).json(responseUSer);
    }catch{
        res.status(500).json({message:"Internal server error"});
    }
};

const deleteCtrl = async (req: Request, res: Response) => {

    const {id} = req.body;

    if(!id||typeof id !== 'string'|| id.trim().length === 0){
        return res.status(400).json({message:"Id is required as a non-empty string"});
    }

    const responseUSer = await deleteUser(id);

    if(responseUSer.message==="NOT_FOUND_USER"){
        return res.status(404).json(responseUSer);
    }else{
        return res.status(201).json(responseUSer);
    }
};

const loginCtrl = async (req: Request, res: Response) => {
    try{

        const {username,password} = req.body;
        const responseCredentials = await loginUser({username,password});
        
        //We make the description of the error in the service
        if(responseCredentials.message==="NOT_FOUND_USER"){
            return res.status(404).json(responseCredentials);
        }else if(responseCredentials.message==="WRONG_Credentials"){
            return res.status(401).json(responseCredentials);
        }else{
            return res.status(201).json(responseCredentials);
        }                           
    }catch{
        return res.status(500).json({message:"Internal server error"});
    }
};
export { resgisterCtrl,deleteCtrl, loginCtrl };
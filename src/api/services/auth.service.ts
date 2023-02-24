import{Auth} from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import UserModel from '../models/user.model';
import {encryptPassword,verifiedPassword } from '../utils/bcryptjs.handle'
import { generateToken } from '../utils/jwt.handle';

const registerNewUser = async (req:User)=>{
    // Register new user
    const {name, email, password} = req;
    //Check if user already exists
    const checkIs = await UserModel.findOne({email:email});
    if(checkIs) return {message:"ALREADY_EXISTS"};
    //Create new user and encrypt the password  
    const passHash = await encryptPassword(password);
    const newUser = await UserModel.create({
        name,
        email, 
        password:passHash
    });
    return newUser;
};
const loginUser = async (req:Auth) => {
    const {email, password} =req;
    const checkIs = await UserModel.findOne({email:email});
    if(!checkIs) return {message:"NOT_FOUND_USER"};
    //Get encrypt password of database
    const passHash = checkIs.password;
    const checkPass = await verifiedPassword(password, passHash);
    if(!checkPass) return {message:"WRONG_PASSWORD"};
    const token_secret = generateToken(checkIs.email);
    const data ={
        token:token_secret,
        user:checkIs,
        message: checkIs.message?checkIs.message:"Ok"
    };    
    return data;
};
export { registerNewUser, loginUser };
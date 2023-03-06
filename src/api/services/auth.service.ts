import{Auth} from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import UserModel from '../models/user.model';
import {encryptPassword,verifiedPassword } from '../utils/bcryptjs.handle'
import { generateToken } from '../utils/jwt.handle';

//Register new user
const registerNewUser = async (req:User)=>{
    // Register new user
    const {name, username, password} = req;
    //Check if user already exists
    const checkIs = await UserModel.findOne({username:username});
    if(checkIs) return {message:"ALREADY_EXISTS"};
    //Create new user and encrypt the password  
    const passHash = await encryptPassword(password);
    
    const newUser = await UserModel.create({
        name: name,
        username: username, 
        password: passHash
    });
    return newUser;
};

//Delete user by id
const deleteUser = async (id:string) => {
    const deleteUSer = await UserModel.findByIdAndDelete({_id:id});
    // console.log('deleteUSer',deleteUSer)
    if(deleteUSer===null) return {message:"NOT_FOUND_USER"};
    const data={
        message: deleteUSer.message?deleteUSer.message:"Ok"
    }
    return data;
};


//Login user
const loginUser = async (req:Auth) => {
    const {username, password} =req;
    const checkIs = await UserModel.findOne({username:username});
    if(!checkIs) return {message:"NOT_FOUND_USER"};
    //Get encrypt password of database
    const passHash = checkIs.password;
    const checkPass = await verifiedPassword(password, passHash);
    if(!checkPass) return {message:"WRONG_PASSWORD"};
    

    const token_secret = generateToken(checkIs.username);
    const data ={
        token:token_secret,
        message: checkIs.message?checkIs.message:"Ok"
    };    
    return data;
};
export { registerNewUser,deleteUser, loginUser };
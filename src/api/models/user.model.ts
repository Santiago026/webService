import {Schema,model} from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>(
    {   name: {
            type: String,
            required: true
        },
        description:{
            type: String,
            required: false,
            default: "Sin descripción"
        } ,
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        
        message:{
            type: String,
            required: false
        }

    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'users'
    }

);

const UserModel = model('user',UserSchema);
export default UserModel;
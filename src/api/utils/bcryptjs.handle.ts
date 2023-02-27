import bcrypt from 'bcryptjs';


const encryptPassword = async (password:string) => {
    const salt = await bcrypt.genSalt(10);
    const passwordHash= await bcrypt.hash(password, salt);
    return passwordHash;
};

const verifiedPassword = async (password:string, savedPassword:string)=> {
    try {
        const isCorrect =await bcrypt.compare(password, savedPassword);
        return isCorrect;
    } catch (error) {
        return error;
    }
};


export { encryptPassword, verifiedPassword };

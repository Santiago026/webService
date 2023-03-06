import{sign,verify} from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'token_secret.UK';


//Generate token with Header, Pyload and Verify Signature
const generateToken = (id: string) => {
    //Make a signature with the user id and the secret key
    const token = sign({ _id:id }, JWT_SECRET, {
        expiresIn: '1h',      
    });
    return token;
};


//Verify token
const verifyToken = (token: string) => {
    //Validate if the token italready exist, its valid and not expired
    //It's should  elminate the token from the database
    const decoded = verify(token, JWT_SECRET);

    return decoded;
};

export { generateToken, verifyToken };





import{sign,verify} from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'token_secret.UK';


// const jwtHandle = (req: Request, res: Response, next: NextFunction) => {
//     const token = req.header('auth-token');
//     if (!token) return res.status(401).send('Access Denied');
//     try {
//         const verified = verify(token, process.env.TOKEN_SECRET as string);
//         req.body.user = verified;
//         next();
//     } catch (error) {
//         res.status(400).send('Invalid Token');
//     }
// }

//Generate token with Header, Pyload and Verify Signature
const generateToken = (id: string) => {
    //Make a signature with the user id and the secret key
    const token = sign({ _id:id }, JWT_SECRET, {
        expiresIn: '2h',
    });
    return token;
};

//Verify token
const verifyToken = (token: string) => {
    const decoded = verify(token, JWT_SECRET);
    return decoded;
};

export { generateToken, verifyToken };





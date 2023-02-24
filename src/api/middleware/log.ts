/**
 *Middleware : It's between the routes and the controllers 
*/
import {Request, Response, NextFunction} from 'express';
const logMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    // console.log(`Request: ${req.method} ${req.url}`);
    const  headers = req.headers;
    const userAgent = headers['user-agent'];
    console.log(`Request: ${req.method} ${req.url} ${userAgent}`);
    //If we don't call next, the request will be blocked and wait indeterminately
    next();

};
export {logMiddleware};
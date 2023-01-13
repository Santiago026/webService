import express from 'express';
import { NextFunction, Request, Response } from "express";
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import { router as prizeRoute } from './routes/prize.route';
const router = express();

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        
        Logging.info('Mongo connected successfully.');
        StartServer();
    })
    .catch((error) => {
        Logging.error('Unable to connect to Mongo');
        Logging.error(error)
    });


const StartServer: Function = () => {

    router.use((req, res, next) => {

        Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {

            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });
    
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    
    /** Rules of our API (middleware)*/
    router.use((req:Request,res:Response,next:NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        
        return next();
    });

    /** Routes */
    router.use(`${config.api.prefix}/prize`, prizeRoute);


    /** Healthcheck */
    router.get('/ping', (_req, res, _next) => res.status(200).json({ message: 'pong' }));

    /** Error handling */
    router.use((_req, res, _next)=> {
        const error = new Error('Not found');

        Logging.error(error);

        res.status(404).json({
            message: error.message
        });
    });
    
    http.createServer(router).listen(
        config.server.port, 
        () => Logging.info(`Server is running on port ${config.server.port}`)
    );
};
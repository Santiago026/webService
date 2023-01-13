import Joi,{ObjectSchema} from 'joi';
import { NextFunction, Request, Response  } from 'express'; 
import {IPrize } from '../schemas/prize.schema';
import Logging from '../library/Logging';


export const ValidateJoi = (schema: ObjectSchema) => {
    return async(req: Request, res: Response, next: NextFunction) =>{
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);

            res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    prize: {
        createManyPrizesFile: Joi.object({
            file: Joi.string().required()
        }),
        createPrize : Joi.object<IPrize>({
            fecha: Joi.string().required(),
            id_transaccion: Joi.string().required(),
            punto_venta: Joi.string().required(),
            municipio: Joi.string().required(),
            documento: Joi.string().required(),
            producto: Joi.string().required(),
            valor_premio: Joi.string().required()
        }),
    },
};

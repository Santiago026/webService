import {Schema,model} from "mongoose";
import {Prize}from "../interfaces/prize.interface";
const PrizeSchema = new Schema<Prize>(
    {
        TRANSACCION_ID:{
            type: String,
            required: true,
        },
        FECHA_SORTEO:{
            type: Date,
            required: true,
        },
        VALOR_PREMIO:{
            type: Number,
            required: true,
        },
    }
);
const PrizeModel = model('prizes',PrizeSchema);
export default PrizeModel;
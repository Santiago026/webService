import PrizeModel from "../models/prize.model";
import {Prize} from "../interfaces/prize.interface";

//Service to insert a new prize
const insertPrize = async (prize: Prize) => {
    const responseInsert = await PrizeModel.create(prize);
    return responseInsert;
}

//Service to get a single prize
const getPrize =async (id: string) => {
    const responsePrize = await PrizeModel.findById({_id:id});
    return responsePrize;
};

//Services to get a single prize by transaction id
const findPrizeByTransactionId = async (transaction_id: string) => {
    const responsePrize = await PrizeModel.findOne({TRANSACCION_ID:transaction_id});
    return responsePrize;

};


//Service to get a single prize by date
const findPrizeByDate = async ( FECHA_SORTEO:Date) => {
    console.log(FECHA_SORTEO);
    const responsePrize= await PrizeModel.find({
        $and: [
            {"FECHA_SORTEO": {$gte: FECHA_SORTEO}},
            {"FECHA_SORTEO": {$lt: new Date(FECHA_SORTEO.getTime() + 24 * 60 * 60 * 1000)}}
        ]
    });
    return responsePrize;
};

//Service to get all prizes by range of dates
const findPrizeByRangeOfDates = async (start_date:Date,end_date:Date) => {
    console.log(start_date);
    console.log(end_date);
    const responsePrize= await PrizeModel.find({
            $and: [
                {"FECHA_SORTEO": {$gte: start_date}},
                {"FECHA_SORTEO": {$lte: end_date}}
            ]
    }, {}, {sort: {FECHA_SORTEO: 1}});
    return responsePrize;  

};

//Service to get all prizes
const getPrizes = async () => {
    const responsePrizes = await PrizeModel.find({});
    return responsePrizes;
}

//Service to update a prize
const updatePrize = async (id: string, data: Prize) => {
    const responsePrize = await PrizeModel.findOneAndUpdate(
        {_id:id},
        data,
        {new:true}
    );
    return responsePrize;
};

//Service to delete a prize
const deletePrize = async (id: string) => {
    const responsePrize =await PrizeModel.remove({_id:id});
    return responsePrize;
};

export {
    insertPrize,
    getPrize,
    findPrizeByTransactionId,
    findPrizeByDate,
    findPrizeByRangeOfDates,
    getPrizes,
    updatePrize,
    deletePrize
};
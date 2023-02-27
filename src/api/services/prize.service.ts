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

//Service to get a single prize by date
const findPriceByDate = async ( fechaSorteo:string) => {
    const responsePrize= await PrizeModel.find({FECHA_SORTEO:fechaSorteo});
    
    return responsePrize;
};

//Service to get all prizes by range of dates
const findPriceByRangeOfDates = async (start_date:string,end_date:string) => {
    const responsePrize= await PrizeModel.find(
        {FECHA_SORTEO:{$gte:start_date,$lte:end_date}}
    );
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

export {insertPrize,getPrize,findPriceByDate,findPriceByRangeOfDates,getPrizes,updatePrize,deletePrize};
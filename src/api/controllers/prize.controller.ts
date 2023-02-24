import {Request, Response,NextFunction} from "express";
// import { handleHttp } from '../utils/error.handle';
import { 
  insertPrize,
  getPrize,
  findPriceByDate,
  findPriceByRangeOfDates,
  getPrizes,
  updatePrize,
  deletePrize 
} from "../services/prize.service";

//Create a new prize
const createPrize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const responsePrize = await insertPrize(req.body);
    // res.status(201).json({ prize: responsePrize });
    res.send(responsePrize);
  } catch (error) {
    next(error);
  }
}
//Get a single prize by id
const getPrizeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const{id} = req.params;
    const responsePrize = await getPrize(id);
    const data= responsePrize?responsePrize:{message:"Prize not found"};
    res.send(data);
  } catch (error) {
    next(error);
  }
};
//Get each prize by date sended by body
const getPrizeByDate = async (req: Request, res: Response, next: NextFunction) =>{
  try{
    const {FECHA_SORTEO}= req.body;
    if(!FECHA_SORTEO){
      return res.status(400).json({message:"FECHA_SORTEO is required"});
    }
    const responsePrize = await findPriceByDate(FECHA_SORTEO);
    res.send(responsePrize);
  }catch(error){
    next(error);
  }
  return res.status(500).json({ message: "Internal server error" });
};
//Get all prizes by range of dates sended by body
const getPrizeByRangeOfDates = async (req: Request,res: Response,next: NextFunction) => {
  try{
    const {start_date,end_date}= req.body;
    if(!start_date|| !end_date){
      return res.status(400).json({message:"start_date and end_date are required"});
    }
    const responsePrize = await findPriceByRangeOfDates(start_date,end_date);
    res.status(200).json(responsePrize);
  }catch(error){
    next(error);
  }
  return res.status(500).json({ message: "Internal server error" });
};

//Get all prizes
const getPrizesList = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const responsePrizes = await getPrizes();
    res.send(responsePrizes);
  } catch (error) {
    next(error);
  }
};
//Update a prize by id
const updatePrizeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const{id} = req.params;
    const responsePrize = await updatePrize(id,req.body);
    res.send(responsePrize);
  } catch (error) {
    next(error);
  }
};
//Delete a prize by id
const deletePrizeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const{id} = req.params;
    const responsePrize = await deletePrize(id);
    res.send(responsePrize);
  } catch (error) {
    next(error);
  }
};

export {
  createPrize,
  getPrizeById,
  getPrizeByDate,
  getPrizeByRangeOfDates,
  getPrizesList,
  updatePrizeById,
  deletePrizeById
};





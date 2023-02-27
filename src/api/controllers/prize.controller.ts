import {Request, Response,NextFunction} from "express";
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
    return res.send(responsePrize);
  } catch (error) {
    next(error);
  }
  return res.status(500).json({ message: "Internal server error" });
}
//Get a single prize by id of transaction
const getPrizeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const{id} = req.params;
    const responsePrize = await getPrize(id);
    const data= responsePrize?responsePrize:{message:"Prize not found"};
    return res.send(data);
  } catch (error) {
    next(error);
  }
  return res.status(500).json({ message: "Internal server error" });
};

//Get each prize by date sended by body
const getPrizeByDate = async (req: Request, res: Response, next: NextFunction) =>{
  try{
    const {FECHA_SORTEO}= req.body;
    if(!FECHA_SORTEO || typeof FECHA_SORTEO !== 'string' || FECHA_SORTEO.trim().length === 0){
      return res.status(400).json({message:"FECHA_SORTEO is required as a non-empty string"});
    }
    const responsePrize = await findPriceByDate(FECHA_SORTEO);
    if (responsePrize.length === 0) {
      return res.status(404).json({message: "No prize found for the specified date"});
    }
    return res.send(responsePrize);
  }catch(error){
    next(error);
  }
  return res.status(500).json({ message: "Internal server error" });
};

//Get all prizes by range of dates sended by body
const getPrizeByRangeOfDates = async (req: Request,res: Response,next: NextFunction) => {
  try{
    const {start_date,end_date}= req.body;
    //Validate that start_date and end_date are required
    if(!start_date|| !end_date|| 
      typeof start_date !== 'string' 
      || typeof end_date !== 'string' 
      || start_date.trim().length === 0 
      || end_date.trim().length === 0
    ){
      return res.status(400).json({message:"start_date and end_date are required"});
    }
    //Validate that start_date is less than end_date
    if(start_date>end_date){
      return res.status(400).json({message:"start_date must be less than end_date"});
    }
    //Validate format of dates 'dd/mm/yyyy'
    const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{2}$/;
    if(!regex.test(start_date) || !regex.test(end_date)){
      return res.status(400).json({message:"start_date and end_date must be in format dd/mm/yyyy"});
    }
    const responsePrize = await findPriceByRangeOfDates(start_date,end_date);
    //Validate tha prizes exist for the range of dates
    if (responsePrize.length === 0) {
      return res.status(404).json({message: "No prize found for the specified range of dates"});
    }

    return res.status(201).json(responsePrize);
  }catch(error){
    next(error);
  }
  return res.status(500).json({ message: "Internal server error" });
};

//Get all prizes
const getPrizesList = async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const responsePrizes = await getPrizes();
    return res.send(responsePrizes);
  } catch (error) {
    // next(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Update a prize by id
const updatePrizeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const{id} = req.params;
    const responsePrize = await updatePrize(id,req.body);
    return res.send(responsePrize);
  } catch (error) {
    next(error);
  }
  return res.status(500).json({ message: "Internal server error" });
};

//Delete a prize by id
const deletePrizeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const{id} = req.params;
    const responsePrize = await deletePrize(id);
    return res.send(responsePrize);
  } catch (error) {
    next(error);
  }
  return res.status(500).json({ message: "Internal server error" });

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





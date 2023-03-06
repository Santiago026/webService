import {Request, Response,NextFunction} from "express";
import { 
  insertPrize,
  getPrize,
  findPrizeByTransactionId,
  findPrizeByDate,
  findPrizeByRangeOfDates,
  getPrizes,
  updatePrize,
  deletePrize 
} from "../services/prize.service";

function parseDate(dateStr: string) {
  // Convierte una fecha en formato "dd/mm/aa" a un objeto Date
  const [day, month, year] = dateStr.split('/');
  return new Date(`${month}/${day}/${year}`);
}

function daysBetweenDates(date1:Date, date2:Date) {
  // Calcula la diferencia en días entre dos fechas
  const differenceInMs = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
}

function validateDateDifference(date1Str:string, date2Str:string, maxDaysDifference: number) {
  // Valida que la diferencia en días entre dos fechas no sea mayor a maxDaysDifference
  const date1 = parseDate(date1Str);
  const date2 = parseDate(date2Str);
  const difference = daysBetweenDates(date1, date2);
  return difference <= maxDaysDifference;
}



//Create a new prize
const createPrize = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const responsePrize = await insertPrize(req.body);
    return res.json(responsePrize);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while processing your request." });  
  }
}
//Get a single prize by id of transaction
const getPrizeById = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const{id} = req.params;
    const responsePrize = await getPrize(id);
    const data= responsePrize?responsePrize:{message:"Prize not found"};
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while processing your request." });
  }
};
//Get a pize by TRANSACCION_ID
const getPrizeByTransactionId = async (req: Request, res: Response, _next: NextFunction) => {
  try{
    const {TRANSACCION_ID}= req.body;
    if(!TRANSACCION_ID||typeof TRANSACCION_ID !== 'string'||TRANSACCION_ID.trim().length === 0){
      return res.status(400).json({message:"TRANSACCION_ID is required as a non-empty string"});
    };

    const responsePrize = await findPrizeByTransactionId(TRANSACCION_ID);
    const data= responsePrize?responsePrize:{message:"Prize not found"};
    return res.json(data);
  }catch(error){
    return res.status(500).json({ message: "An error occurred while processing your request." });
  }

};

//Get each prize by date sended by body
const getPrizeByDate = async (req: Request, res: Response,_next: NextFunction) =>{
  try{
    const {FECHA_SORTEO}= req.body;
    if(!FECHA_SORTEO || typeof FECHA_SORTEO !== 'string' || FECHA_SORTEO.trim().length === 0){
      return res.status(400).json({message:"FECHA_SORTEO is required as a non-empty string"});
    }
    const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{2}$/;
    if(!regex.test(FECHA_SORTEO) ){
      return res.status(400).json({message:"start_date and end_date must be in format dd/mm/yy"});
    }
    const dateObj= new Date(`20${FECHA_SORTEO.split('/').reverse().join('-')}T00:00:00.000Z`);
    const responsePrize = await findPrizeByDate(dateObj);
    if (responsePrize.length === 0) {
      return res.status(404).json({message: "No prize found for the specified date"});
    }
    return res.status(201).json(responsePrize);
  }catch(error){
    return res.status(500).json({ message: "An error occurred while processing your request." });
  }

};

//Get all prizes by range of dates sended by body
const getPrizeByRangeOfDates = async (req: Request,res: Response,_next: NextFunction) => {
  try{
    const {start_date,end_date}= req.body;
    /**Validate that start_date and end_date are required**/
    if(!start_date|| !end_date|| typeof start_date !== 'string' || typeof end_date !== 'string' 
      || start_date.trim().length === 0 
      || end_date.trim().length === 0
    ){
      return res.status(400).json({message:"start_date and end_date are required"});
    }

    /**Validate format of dates 'dd/mm/yy'**/
    const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{2}$/;
    if(!regex.test(start_date) || !regex.test(end_date)){
      return res.status(400).json({message:"start_date and end_date must be in format dd/mm/yy"});
    }
    /**Validate that the start_date is not greater than the end_date**/
    else if (new Date(start_date) > new Date(end_date)) {
      return res.status(400).json({ message: "start_date can't be greater than end_date" });
    }

    /**Validate that the month of start_date is not greater than the month of end_date,
     if the year of start_date is equal to the year of end_date and 
     the day of start_date is less than or equal to the day of end_date**/
    else if (start_date.split("/")[2] > end_date.split("/")[2] || 
      (start_date.split("/")[2] === end_date.split("/")[2] 
      && start_date.split("/")[1] > end_date.split("/")[1]) || 
      (start_date.split("/")[2] === end_date.split("/")[2] && 
      start_date.split("/")[1] === end_date.split("/")[1] && 
      start_date.split("/")[0] > end_date.split("/")[0])
    ) {
      return res.status(400).json({ message: "The start_date must be less than or equal to the end_date" });
    }

    /**Validate that the range dates between start_date and end_date is not greater than 30 days**/
    else if (!validateDateDifference(start_date, end_date, 30)) {
      return res.status(400).json({ message: "The difference between start_date and end_date can't be greater than 30 days" });
    }

    const startDateObj = new Date(`20${start_date.split('/').reverse().join('-')}T00:00:00.000Z` );
    const endDateObj = new Date(`20${end_date.split('/').reverse().join('-')}T00:00:00.000Z` );
    const responsePrize = await findPrizeByRangeOfDates(startDateObj,endDateObj);
 
    // Validate that prizes exist for the range of dates
    if (responsePrize.length === 0) {
      return res.status(404).json({ message: "No prize found for the specified range of dates" });
    }
    
    return res.status(201).json(responsePrize);
  }catch(error){
    return res.status(500).json({ message: "An error occurred while processing your request." });
  }
  
};

//Get all prizes
const getPrizesList = async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const responsePrizes = await getPrizes();
    return res.json(responsePrizes);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Update a prize by id
const updatePrizeById = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const{id} = req.params;
    const responsePrize = await updatePrize(id,req.body);
    return res.json(responsePrize);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while processing your request." });
  }
  
};

//Delete a prize by id
const deletePrizeById = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const{id} = req.params;
    const responsePrize = await deletePrize(id);
    return res.json(responsePrize);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while processing your request." });
  }
  

};

export {
  createPrize,
  getPrizeById,
  getPrizeByTransactionId ,
  getPrizeByDate,
  getPrizeByRangeOfDates,
  getPrizesList,
  updatePrizeById,
  deletePrizeById
};





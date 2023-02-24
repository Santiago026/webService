import { Router } from "express";
import {
    createPrize,
    getPrizeById,
    getPrizeByDate,
    getPrizeByRangeOfDates,
    getPrizesList,
    updatePrizeById,
    deletePrizeById
} from '../controllers/prize.controller';
import { checkToken } from "../middleware/session";
const router = Router();
router.get("/",checkToken,getPrizesList);//Get all items
router.get("/:id",checkToken,getPrizeById);//Get a single item via ID
router.post('/date',checkToken,getPrizeByDate);//Get a single item via date
router.post('/dates',checkToken,getPrizeByRangeOfDates);//Get a single item via date
router.post("/",checkToken,createPrize);//Create a new item 
router.put("/:id",checkToken,updatePrizeById);//Update an item via ID
router.delete("/:id",checkToken,deletePrizeById);//Delete an item via ID

export {router};
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
router.get("/",checkToken,getPrizesList);
router.get("/:id",checkToken,getPrizeById);
router.post('/date',checkToken,getPrizeByDate);
router.post('/dates',checkToken,getPrizeByRangeOfDates);
router.post("/",checkToken,createPrize);
router.put("/:id",checkToken,updatePrizeById);
router.delete("/:id",checkToken,deletePrizeById);

export {router};
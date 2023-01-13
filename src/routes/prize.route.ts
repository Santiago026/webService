import  express  from   'express' ;
import prizeController from '../Controllers/prize.controller';
import { Schemas, ValidateJoi } from '../middleware/validator';

export const router = express.Router();

/** Routes  */
router.post('/create', prizeController.createPrize);
router.get('/get/date', prizeController.readPrize);
router.get('/get/:dateMatch', prizeController.readMatchPrize);
router.get('/get', prizeController.readAllPrize);
router.post('/file',ValidateJoi(Schemas.prize.createManyPrizesFile),prizeController.createManyPrizesFile);
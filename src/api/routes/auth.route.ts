import{Router}from 'express';
import {resgisterCtrl,loginCtrl} from '../controllers/auth.controller';
const router = Router();

router.post("/register",resgisterCtrl);
router.post("/login",loginCtrl);

export {router};
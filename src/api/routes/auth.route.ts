import{Router}from 'express';
import {resgisterCtrl,deleteCtrl,loginCtrl} from '../controllers/auth.controller';
const router = Router();

router.post("/register",resgisterCtrl);
/**
 * Post track
 * openapi
 * /login:
 *    post:
 *      tags:
 *        - users
 *      summary: "Listar usuario"
 *      description: Este endpoint es para listar los usuario totales 
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      security:
 *       - bearerAuth: []
 */

router.post("/login",loginCtrl);
router.delete('/delete',deleteCtrl);
export {router};
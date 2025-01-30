import { Router } from "express";
import {methods as apiController} from "../controllers/api.controller.js"
import swaggerJSDoc from "swagger-jsdoc";
import verifyToken from '../middlewares/authModlewares.js'
const router = Router();



/**
 * @openapi
 * /api/user/users:
 *   get:
 *     description: obtiene toda la lista de usuarios
 *     responses:
 *       200:
 *         description: la lista de usuarios.
 */
router.get('/users',apiController.getUsers);

/**
 * @openapi
 * /api/user/add:
 *   post:
 *     description: anade un usuario a  la lista de usuarios
 *     responses:
 *       200:
 *         description:anadir usuario
 */
router.post('/add',apiController.addUser);

//iniciar sesion
router.post('/login',apiController.loginUser);

router.get('/profile',verifyToken,apiController.profile)


router.get('/medical',apiController.getMedical);
router.post('/medical',apiController.addMedical)


router.get('/citas/:id_usuario',apiController.getCitabyId);


/**
 * @openapi
 * /api/user/citas:
 *   get:
 *     description: obtiene toda la lista de usuarios
 *     responses:
 *       200:
 *         description: la lista de usuarios.
 */
router.get('/citas',apiController.getCita);




router.post('/citas',apiController.addCita);
router.put('/citas/:id_usuario',apiController.actCita)


/**
 * @openapi
 * /api/user/horario:
 *   get:
 *     description: obtiene toda la lista de usuarios
 *     responses:
 *       200:
 *         description: la lista de usuarios.
 */
router.get('/horario',apiController.getHorario);



router.post('/horario',apiController.addHorario);
router.put('/horario/:id_horario',apiController.actHorario)

export default router;
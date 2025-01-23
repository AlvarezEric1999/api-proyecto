import { Router } from "express";
import {methods as apiController} from "../controllers/api.controller.js"
const router = Router();




router.get('/users',apiController.getUsers);
router.post('/add',apiController.addUser);
router.post('/login',apiController.loginUser);


router.get('/medical',apiController.getMedical);
router.post('/medical',apiController.addMedical)


router.get('/citas/:id_cita',apiController.getCita);
router.post('/citas',apiController.addCita);



router.get('/horario',apiController.getHorario);
router.post('/horario',apiController.addHorario);

export default router;
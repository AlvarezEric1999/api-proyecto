import { Router } from "express";
import {methods as apiController} from "../controllers/api.controller.js"
const router = Router();




router.get('/users',apiController.getUsers);
router.post('/add',apiController.addUser);
router.post('/login',apiController.loginUser);


export default router;
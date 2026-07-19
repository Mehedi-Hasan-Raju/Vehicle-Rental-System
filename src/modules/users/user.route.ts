import express, { Request, Response }from 'express';
import { usersController } from './user.controller'; 

import logger from '../../middlewere/loger';
const router = express.Router();

router.post("/", usersController.createUser);
router.get("/", logger,  usersController.getUser);
router.get("/:id", usersController.getSingel);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);



export const userRoute = router;
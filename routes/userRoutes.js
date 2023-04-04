import { Router } from "express";
import { createToken } from "../controllers/tokenController.js";
import { addUser, getUsers } from "../controllers/userController.js";

const userRoutes = Router();

// to chain several routes, first use "route" keyword and set path, then add requests
userRoutes.route('/').get(getUsers).post(addUser);

userRoutes.route('/:userId/token').post(createToken);

export default userRoutes;
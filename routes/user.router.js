import express from 'express';
const userRouter = express.Router();

import { register, login, logout, getOtherUser } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
userRouter.get('/', isAuthenticated, getOtherUser);

export default userRouter;

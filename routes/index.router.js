import express from 'express';
const router = express.Router();

import userRouter from './user.router.js';
import messageRouter from './message.router.js';

router.use('/user', userRouter);
router.use('/message', messageRouter);

export default router;
import express from 'express';
const messageRouter = express.Router();

import { getMessage, sendMessage } from '../controllers/message.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

messageRouter.post('/send/:id', isAuthenticated, sendMessage);
messageRouter.get('/:id', isAuthenticated, getMessage);

export default messageRouter;

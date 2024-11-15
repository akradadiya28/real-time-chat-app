import express from 'express';
import router from './routes/index.router.js';
import env from 'dotenv';
import cors from 'cors';
env.config();
import cookieParser from 'cookie-parser';
import db from './config/db.js';
import { server, app } from './socket/socket.js';

const port = process.env.PORT || 8001;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use('/api', router);

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}/api`);
});
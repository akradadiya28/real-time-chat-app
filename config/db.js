import mongoose from 'mongoose';
import env from 'dotenv';
env.config();

const db = mongoose.connect(process.env.DB_URI).then((res) => {
    console.log('Database connected');
}).catch((err) => {
    console.log("err", err);
})

export default db;
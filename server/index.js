import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRouter from './routers/todoRouter.js';
import userRouter from './routers/userRouter.js';

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(cors()); // allows testing from different origin
app.use(express.json()); // allows client to send json data
app.use(express.urlencoded({extended: false})); // use curl through url
app.use('/', todoRouter);
app.use('/user', userRouter);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({error: err.message});
});

app.listen(port);
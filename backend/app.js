import express from 'express'
import {config} from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import ConnectDB from './database/db.js'
import messageRouter from './routers/messageRouter.js'
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import userRouter from './routers/userRouter.js'
import appointmentRouter from './routers/appointmentRouter.js'
const app = express();
config({path : './config/config.env'});

app.use(cors({
    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
}))

app.use('/api/message',messageRouter);
app.use('/api' , userRouter)
app.use('/api/appointment',appointmentRouter)

ConnectDB();
app.use(errorMiddleware)
export default app;

import Message from "../models/MessageSchema.js";
import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from '../middlewares/errorMiddleware.js';

export const sendMessage = catchAsyncErrors(async(req,res,next)=>{
    const{firstName,lastName,email,phone,message} = req.body;
    if(firstName && lastName && email && phone && message){
        await Message.create({firstName,lastName,email,phone,message})
        res.status(200).json({message:"message sent successfully"}) 
    }
   
    return next(new ErrorHandler("please fill the form!,400"))
})

export const getAllMessages=catchAsyncErrors(async(req,res,next)=>{
    const messages = await Message.find();
    return res.status(200).json({messages}) 
})


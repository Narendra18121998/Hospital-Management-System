import {catchAsyncErrors} from './catchAsyncErrors.js'
import ErrorHandler from './errorMiddleware.js'
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

export const isAdminAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Admin is not authenticated" ,400))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    //console.log(decoded)
    req.user = await User.findById(decoded.id)
    if(req.user.role!=="Admin"){
        return next(new ErrorHandler(`${req.user.role} is not authorized` ,400))    
    }
    next();
})

export const isPatientAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("Patient is not authenticated" ,400))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    //console.log(decoded)
    req.user = await User.findById(decoded.id)
    if(req.user.role!=="Patient"){
        return next(new ErrorHandler(`${req.user.role} is not authorized` ,400))    
    }
    next();
})



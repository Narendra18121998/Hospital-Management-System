import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from '../middlewares/errorMiddleware.js';
import User from '../models/userSchema.js'
import {generateToken} from '../utils/jwtToken.js';
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,password,gender,dob,nic ,role} = req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role){
        const isRegistered = await User.findOne({email})
        if(isRegistered){
            return res.status(400).json({message:"user already registered"})
        }
        const user = await User.create({firstName,lastName,email,phone,password,gender,dob,nic,role:"Patient"})
        generateToken(user,"user has been registered",200,res)
        
    }
    return next(new ErrorHandler("please fill full form",400))
})

export const login = catchAsyncErrors(async(req,res,next)=>{
    const {email,password,confirmPassword,role} = req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("please fill full form",400))   
    }
    if(password!==confirmPassword){
        return next(new ErrorHandler("password and confirmPassword does't match",400))  
    }
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid email or password",400))  
    }
    const isPasswordMatch = await user.comparePassword(password)
    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid email or password",400)) 
    }
    if(role!==user.role){
        return next(new ErrorHandler("user with this role not found",400)) 
    }
    generateToken(user,"user login successful",200,res)
})

export const addNewAdmin = catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,password,gender,dob,nic} = req.body;
    if(firstName && lastName && email && phone && password && gender && dob && nic){
        const isRegistered = await User.findOne({email})
        if(isRegistered){
            return next(new ErrorHandler(`${isRegistered.role} with this email already exists`,400))
        }
       const admin =  await User.create({firstName,lastName,email,phone,password,gender,dob,nic,role:"Admin"})
        return res.status(200).json({message:"New admin registered" , admin})
    }
    return next(new ErrorHandler("please fill full form",400))
})

export const getAllDoctors=catchAsyncErrors(async(req,res,next)=>{
    const doctors = await User.find({role:"Doctor"})
    return res.status(200).json({doctors})
})

export const getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    return res.status(200).json({user})
})


export const logoutAdmin=catchAsyncErrors(async(req,res,next)=>{
    return res.status(200).cookie("adminToken","", {httpOnly:true , expires: new Date(Date.now())}).json({message:"Admin logout successfully"})
})

export const logoutPatient=catchAsyncErrors(async(req,res,next)=>{
    return res.status(200).cookie("patientToken","", {httpOnly:true , expires: new Date(Date.now())}).json({message:"Patient logout successfully"})
})

export const addNewDoctor=catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,password,gender,dob,nic,doctorDepartment} = req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob ||!nic  ||!doctorDepartment){
        return next(new ErrorHandler("all the details are required",400))
    }
    const isRegistered = await User.findOne({email})
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} is already registered`,400))
    }
    
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Doctor avatar required",400))
    }
    const {docAvatar} = req.files;
    const allowedFormats = ["image/png","image/jpeg","image/webp","image/jpg"]
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File format not supported",400))
    }
    
    const  cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath)
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log("cloudinary error:" , cloudinaryResponse.error || "unknown cloudinary error")
    }
    const doctor = await User.create({firstName,lastName,email,phone,password,gender,dob,nic, role:"Doctor",doctorDepartment,docAvatar:{public_id:cloudinaryResponse.public_id, url:cloudinaryResponse.secure_url}})

    return res.status(200).json({message:"New doctor registered successfully",doctor})
})


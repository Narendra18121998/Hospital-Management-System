import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from '../middlewares/errorMiddleware.js'
import {Appointment} from '../models/appointmentSchema.js'
import User from '../models/userSchema.js'


export const postAppointment=catchAsyncErrors(async(req,res,next)=>{
    const{firstName,lastName,email,phone,nic,dob,gender,appointment_date,department,doctor_firstName,doctor_lastName,hasVisited,address} = req.body;

    if(!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !appointment_date ||!department || !doctor_firstName || !doctor_lastName ||!address){
        return next(new ErrorHandler("please fill full form",400))
    }

    const isConflict = await User.find({firstName:doctor_firstName,lastName:doctor_lastName,role:"Doctor",doctorDepartment:department})
    if(isConflict.length===0){
        return next(new ErrorHandler("Doctor not found",400))
    }
    if(isConflict.length>1){
        return next(new ErrorHandler("Doctors conflict! please contact through email or phone",400))
    }

    const doctorId = isConflict[0]._id;
    const patientId = req.user._id; 

    const appointment = await Appointment.create({firstName,lastName,email,phone,nic,dob,gender,appointment_date,department,
    doctor:{firstName:doctor_firstName,lastName:doctor_lastName},hasVisited,address,doctorId,patientId})
    
    return res.status(200).json({message:"Appointment successful",appointment})
})

export const getAllAppointments=catchAsyncErrors(async(req,res,next)=>{
    const appointments = await Appointment.find()
    return res.status(200).json({appointments})
})

export const updateAppointmentStatus=catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    const  appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found",400))
    }
    const updated_appointment = await Appointment.findByIdAndUpdate(id ,req.body ,{new:true})
    return res.status(200).json({message:"Appointment status updated" ,updated_appointment})
})

export const deleteAppointment = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    const  appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found",400))
    }
    await appointment.deleteOne();
    return res.status(200).json({message:"Appointment deleted successfully"})

})


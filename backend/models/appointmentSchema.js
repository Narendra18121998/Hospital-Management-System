import mongoose from 'mongoose'
import validator from 'validator'

const appointmentSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First name must contain atleast three charcters!"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last name must contain atleast three charcters!"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail ,"please enter a valid email!"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"phone nubmber must contain atleast 10 digits!"],
        maxLength:[10,"phone nubmber must contain atleast 10 digits!"]
    },
    nic:{
        type:String,
        required:true,
        minLength:[13,"NIC nubmber must contain exact 13 digits!"],
        maxLength:[13,"NIC nubmber must contain exact 13 digits!"]
    },
    dob:{
        type:Date,
        required:[true,"DOB is required!"]
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"]
    },
    appointment_date:{
        type:String,
        required:true,
        department:{
            type:String,
            required:true
        }
    },
    department:{
        type:String,
        required:[true,"Department name is required!"]
    },
    doctor:{
        firstName:{
            type:String,
            required:true 
        },
        lastName:{
            type:String,
            required:true
        }
    },
    hasVisited:{
        type:Boolean,
        default:false
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    patientId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    }
})

export const Appointment = mongoose.model('Appointment',appointmentSchema);

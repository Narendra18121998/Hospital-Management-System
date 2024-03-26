import mongoose from "mongoose";
import validator from "validator";

const messageSchema= new mongoose.Schema({
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
    message:{
        type:String,
        required:true,
        minLength:[5,"message must contain atleast 5 characters!"],
    }
})

const Message = mongoose.model('Message',messageSchema)
export default Message;

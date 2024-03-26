import mongoose from "mongoose";
const ConnectDB = async()=>{
    const url = process.env.MONGODB_URL;
    try {
        await mongoose.connect(url)
        console.log('database connection successful')
    } 
    catch (error) {
        console.log('database connection failed',error)   
    }
}
export default ConnectDB;

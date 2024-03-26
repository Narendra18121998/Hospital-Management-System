class ErrorHandler extends Error{
    constructor(message,statusCode){
    super(message)
    this.statusCode=statusCode
    }
}

export const errorMiddleware=(err,req,res,next)=>{
    err.message = err.message || "Internal server error"
    err.statusCode = err.statusCode || 500;
    if(err.status===11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message,400)
    }
    if(err.name==="JsonwebTokenError"){
        const message = `Json web token is invalid ,Try again`
        err = new ErrorHandler(message,400)
    }
    if(err.name==="CastError"){
        const message = `Invalid ${err.path}`
        err = new ErrorHandler(message,400)
    }
    const errorMessage = err.errors ? Object.values(err.errors).map(error=>error.message).join(" "):err.message
    
    return res.status(400).json({message:errorMessage})
}


export default ErrorHandler;

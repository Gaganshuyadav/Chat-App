//error middleware
const errorMiddleware =  ( err, req, res, next)=>{

    let { message="Internal Server Error", statusCode=500} = err;
     
    //duplicate key error
    if( err.code===11000){
        message = `Duplicate field - ${Object.keys(err.keyPattern)}`;
        statusCode = 400;
    }

    //CastError:- cast to object failed for value "........."[ i handled this by validations but we can also handle it here]
    if( err.name==="CastError"){
        err.message = process.env.NODE_ENV==="DEVELOPMENT" ? err : `Invalid Format of ${err.path}`;
        err.statusCode = 400;
    }


    res.status( statusCode).json({ 
        success: false,
        message,
    })
}


//the middle function acts as a promise resolve
const catchAsyncErrors = ( fn)=>{
    return function( req, res, next){
        fn( req, res, next).catch( ( err)=> next(err));
    }
}

//error handler 

class errorHandler extends Error{
    constructor( message, statusCode){
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}


export { errorMiddleware, catchAsyncErrors, errorHandler};





















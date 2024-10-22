import jwt from "jsonwebtoken";
import { User} from "../models/user.js";
import { catchAsyncErrors, errorHandler} from "../middlewares/error.js";

const isAuthenticated = catchAsyncErrors( async ( req, res, next) =>{

  
    let token = req.cookies["chit-chat-Token"];

    if(!token){
        //check localstorage for token(for phones)
        token = req.headers.authorization.split(" ")[1] ;
        if(!token){
            return next(new errorHandler("Please Login to access this resource", 401));
        }
    }

    const decodedData = jwt.verify( token, process.env.JWT_SECRET);
    
    const user = await User.findById( decodedData.id);

    if(!user){
        return next("Please Signup",401);
    }

    req.user = user;
    next();

})

const adminOnly = catchAsyncErrors( async( req, res, next)=>{


    let token = req.cookies["chit-chat-Admin-Token"];

    if(!token){
        
        token = req.headers.authorization.split(" ")[1] ;
        if(!token){
            return next(new errorHandler("Please Login to access this resource", 401));
        }
        return next( new errorHandler("Only Admin can access this route", 401));
    }

    const secretKey = jwt.verify( token, process.env.JWT_SECRET);

    const isMatched = secretKey === process.env.ADMIN_SECRET_KEY;
   
    if(!isMatched){
        return next(new errorHandler("Invalid Admin Key", 401));
    }

    next();
})

const socketAuthenticate = async ( socket, next)=>{
  
    let token = socket.request["chit-chat-Token"];
  
    if(!token){
        let token = socket.request.headers.authorization.split(" ")[1];
        if(!token){
            return next( new errorHandler("Please Login to Access this route", 401));
        }

        try{

        const decodeData = jwt.verify( token, process.env.JWT_SECRET);
      
            socket.user = await User.findById(decodeData.id);

            if(!socket.user){
                return next( new errorHandler("you are not authorized user", 401));
            }

            next();
        }
        catch(err){
            return next(new errorHandler("you are not authorized user", 401));
        }
       
    }
}

export { isAuthenticated, adminOnly, socketAuthenticate};

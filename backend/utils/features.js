import jwt from "jsonwebtoken";

const sendToken = async ( res, user, statusCode, message) =>{
    
        // JWT TOKEN
        const token = jwt.sign( { id: user._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        const cookieOptions = {
            maxAge: 15 * 24 * 60 * 60 * 1000 ,
            sameSite: "none",
            httpOnly: true,
            secure: true,
        }
    
        res.status( statusCode).cookie("chit-chat-Token", token, cookieOptions).json({
            success:true, 
            message,
            user,
            token,
        })
}

const emitEvent = ( req, event, users, data) => { 
    console.log("Emitting event ", event);
};

export { sendToken, emitEvent};






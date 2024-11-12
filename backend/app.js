//env
import dotenv from "dotenv";
dotenv.config({
    path:"./.env",
});


//database connect
import { connectDB} from "./databaseConnect.js";
connectDB(process.env.MONGO_URI); 


//Config Cloudinary
import { v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


//imports
import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware} from "./middlewares/error.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT, START_TYPING, STOP_TYPING } from "./constants/events.js";
import { v4 as uuid} from "uuid";
import { getSockets} from "./lib/helper.js";
import { socketAuthenticate } from "./middlewares/auth.js";

//------websocket server
import { Server } from "socket.io";
import http from "http";
const server = http.createServer(app);

const io = new Server( server, {
    cors:{
        origin: true,
        methods:['GET','POST'],
        credentials:true,
    }
});
//------

//SET APP for emit the events with responses,
app.set("io",io);



//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:true,
    methods: [ "GET", "POST", "PUT", "DELETE"],
    credentials: true,

}));

//routes
import userRoute from "./routes/user.js"; 
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import { Message } from "./models/message.js";

app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/admin", adminRoute);


//----socket connection

//io middleware
  //only authenticate user is connected
  io.use( async( socket, next)=>{
    socketAuthenticate( socket, next);
}) 

//active users
let userSocketIDs = new Map();

io.on( "connection", ( socket)=>{
    // console.log("a user connected ",socket.id);
    
     //set active users
     userSocketIDs.set( socket.user._id.toString(), socket.id);


    // (1).new Message
    socket.on( NEW_MESSAGE, async ( { chatId, members, message})=>{


        const messageForDB = {
            content: message,
            sender: socket.user._id,
            chat: chatId,
        };

         //save message in database
         let messageFromDB;
         try{
            messageFromDB = await Message.create(messageForDB);
        }
        catch(err){
            console.log(err);
        }

        //message for real time
        const messageForRealTime = {
            content: message,
            _id: messageFromDB._id,
            sender:{
                _id: socket.user._id,
                name: socket.user.name,
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
        };

         //get socket IDs for each member
         const membersSocket = getSockets(members);

         //send message to all connected members
         io.to(membersSocket).emit(NEW_MESSAGE, {   
             chatId,
             message: messageForRealTime,
         })

        
        // (2). message alert for members
        io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId});
    })

    // (3). message typing and emit to members
    socket.on( START_TYPING, ( { chatId, members })=>{

        //get socket IDs
        const userSocketIDs = getSockets(members);

        io.to(userSocketIDs).emit(START_TYPING, { chatId, message: `${socket.user.name} typing...`})
    })
    socket.on( STOP_TYPING, ( { chatId, members })=>{

        //get socket IDs
        const userSocketIDs = getSockets(members);

        io.to(userSocketIDs).emit(STOP_TYPING, { chatId, message: `${socket.user.name} typing...`})
    })

   

    socket.on("disconnect", ()=>{
        // console.log("user disconnected",socket.id);
        //delete disconnect users
        userSocketIDs.delete(socket.user._id.toString());

    })
})
//------

//error handling
app.use( errorMiddleware);


//server is running
const port = process.env.PORT || 3000;

server.listen( port, ( req, res)=>{
    console.log(`Server is running on port ${port} in ${process.env.NODE_ENV} Mode`);
});

//exports
export { userSocketIDs};
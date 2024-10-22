import { User} from "../models/user.js";
import { Chat} from "../models/chat.js";
import { Request} from "../models/request.js";
import { sendToken} from "../utils/features.js";
import { catchAsyncErrors, errorHandler } from "../middlewares/error.js";
import { NEW_REQUEST, REFETCH_CHATS} from "../constants/events.js";
import { emitEvent} from "../utils/features.js";
import { v2 as cloudinary} from "cloudinary";

//Create a new user and save it to the database and save token in cookies
const newUser =  catchAsyncErrors( async ( req, res, next)=>{

    
    const { name, username, bio, password, confirmPassword } = req.body;

    if(!req.file){
        return next( new errorHandler("Please Upload Avatar"));
    }

    if(!(password===confirmPassword)){
        return next( new errorHandler("Password not match with confirm Password"));
    }
    
    //upload avatar with cloudinary

    let cloud;
    try{
        //convert file to base64
    const getBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
   
        cloud = await cloudinary.uploader.upload( getBase64, {
        folder: "/ChatApp-01/avatars",
    })
    }
    catch(err){
        console.log(err);
    }
   
    const user = await User.create({
        name, 
        username,
        bio,
        password,
        avatar:{
            public_id: cloud.public_id,
            url: cloud.secure_url,
        }
    });

    console.log(user);
    

    sendToken( res, user, 201, "User created successfully");
    
});

//login user and save token in cookies
const login = catchAsyncErrors( async ( req, res, next)=>{

   
    const { username, password} = req.body;

    if(!username || !password){
        return next(new errorHandler( "Please Enter Username and Password", 400));
    }

    const user = await User.findOne({ username}).select("+password");
    
    if(!user){
        return next(new errorHandler("Invalid Credentials", 401));
    }
    const isPasswordMatched  = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new errorHandler("Invalid username or password", 401));
    }
    else{
        sendToken( res, user, 200, "Welcome Back");
    }

});

//delete token from cookie
const logout = catchAsyncErrors( async( req, res)=>{

    const cookieOptions = {
        maxAge: 0 ,
        sameSite: "none",
        httpOnly: true,
        secure: true,
    }

    res.status(200).cookie("chit-chat-Token", null, cookieOptions ).json({
        success:true,
        message:"User Logout Successfully",
    })
});

const getMyProfile = catchAsyncErrors( async( req, res) => {

    //user profile data
    const user = req.user;

    res.status(200).json({
        message: "User Profile Data",
        user
    });
});

const searchUser =  catchAsyncErrors( async( req, res, next) =>{
    
    const { name=""} = req.query;

    //finding All my chats
    const myChats = await Chat.find( { groupChat: false, members: req.user._id});

    //All users from my chats except me
    const allUsersFromMyChats = myChats.flatMap((chat)=>{                                
        return chat.members.filter( (id)=>{
            return id.toString() !== req.user._id.toString()
        })
    });                               

    //finding all users except me and my friends
    const allUsersExceptMeAndFriends = await User.find({$and:
                           [
                           { $and: [ {_id: {$nin: allUsersFromMyChats}}, { _id: {$ne: req.user._id}}] },
                           { name: { $regex: `^${name}`, $options: "i"}}
                           ]
                        });

    //finding id, name and url of all users except me and my friends 
    const allUsersExceptMeAndFriendsWithIdNameAvatar = allUsersExceptMeAndFriends.map( ( user)=>{
        return {
            _id: user._id,
            name: user.name,
            avatar: user.avatar.url
        }
    });

    res.status(200).json({
        success: true,
        users: allUsersExceptMeAndFriendsWithIdNameAvatar,
    })
});

const sendFriendRequest = catchAsyncErrors( async( req, res, next)=>{

    const { userId} = req.body;

    const request = await Request.findOne( {
        $or: [
            {$and: [ {sender: req.user._id}, {receiver: userId} ] },
            {$and: [ {sender: userId}, {receiver: req.user._id} ] }
        ]
    });

    if(request){
        return next( new errorHandler("Request already Sent", 409));
    }

    const newRequest = await Request.create({
        sender: req.user._id,
        receiver: userId,
    });

    emitEvent( req, NEW_REQUEST, [ userId]);

    res.status(201).json({
        success:true,
        message: "Friend Request Sent",
    })

})

const acceptFriendRequest = catchAsyncErrors( async( req, res, next)=>{

    const { requestId, accept} = req.body;
    
    
    const request = await Request.findById(requestId).populate("receiver","name _id").populate("sender","name");
    
    if(!request){
        return next( new errorHandler("Request Not Found",404));
    }

    if(request.receiver._id.toString() !== req.user._id.toString()){
        return next( new errorHandler("You are not authorized to accept this request", 401));
    }

    //if request reject
    if(!accept){
        await request.deleteOne();

        return res.status(403).json({
            success: true,
            message: "Friend Request Rejected",
        })
    }

    //if request accept

    //members
    const members = [ request.sender._id, req.user._id ];

    
    // create chat, delete request
        await Promise.all(
            [
            Chat.create({
                name: `${request.sender.name}-${request.receiver.name}`,
                groupChat: false,
                members,
            }),
            request.deleteOne()
        ] 
        )

    emitEvent( req, REFETCH_CHATS, members);


    res.status(200).json({
        success: true,
        message: "Friend Request Accepted",
        senderId: request.sender._id,
    })
        
})

const getAllNotifications = catchAsyncErrors( async( req, res, next)=>{

    const requests = await Request.find({ receiver: req.user._id}).populate("sender","name avatar");
console.log(requests);
   
    if(!requests){
        return next(new errorHandler("Request not found", 404));
    } 

    const requestsDetails = requests.map( ( request)=>{
        return {
            _id: request._id,
            name: request.sender.name,
            avatar: request.sender.avatar.url,
        }
    })

    res.status(200).json({
        success: true,
        notifications: requestsDetails,
    })
})

//this api used two times, when we want myfriends and if we send chatid then it will send all available friends instead of friends who are available in the group from past
const getMyFriends = catchAsyncErrors( async( req, res ,next)=>{

    const { chatId} = req.query;

    //if we want all friends( without ChatId)
    const allMyFriendsChats = await Chat.find({ groupChat:false , members: req.user._id}).populate("members", "name avatar");

    const allMyFriends = allMyFriendsChats.map((friend)=>{
        const otherUser = friend.members.filter((member)=>{
            return member._id.toString() !== req.user._id.toString()
        });

        return {
            _id: otherUser[0]._id,
            name: otherUser[0].name,
            avatar: otherUser[0].avatar.url
        }
    })


    //if we want all friends( with ChatId or available friends)
    if(chatId){

        const chat = await Chat.findById(chatId);
    
        const availableFriends = allMyFriends.filter( (friend)=>{
            return !chat.members.includes(friend);
        })

        return res.status(200).json({
            success: true,
            len: availableFriends.length,
            availableFriends,
        })
    }


    res.status(200).json({
        success: true,
        len: allMyFriends.length,
        allMyFriends,
    })
})

export { login, newUser, getMyProfile, logout, searchUser, sendFriendRequest, acceptFriendRequest, getAllNotifications, getMyFriends};






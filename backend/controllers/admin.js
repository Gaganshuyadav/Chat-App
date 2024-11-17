import { catchAsyncErrors, errorHandler} from "../middlewares/error.js";
import { User} from "../models/user.js";
import { Chat} from "../models/chat.js";
import { Message} from "../models/message.js";

import jwt from "jsonwebtoken";



const adminLogin = catchAsyncErrors( async( req, res, next)=>{
    
    const { secretKey} = req.body;

    const isMatched = secretKey === process.env.ADMIN_SECRET_KEY ;

    if(!isMatched){
        return next( new errorHandler("Invalid Admin Key", 401));
    }

    const token = jwt.sign( secretKey, process.env.JWT_SECRET);

    const cookieOptions = {
        maxAge: 15 * 60 * 1000 , //only for 15minutes
        sameSite: "none",
        httpOnly: true,
        secure: true,
    }

    res.status(201).cookie("chit-chat-Admin-Token", token, cookieOptions).json({
        success: true,
        token,
        message: "Authenticated Successfully, Welcome BOSS",
    });

}) 

const adminLogout = catchAsyncErrors( async( req, res, next)=>{
    
    const cookieOptions = {
        maxAge: 0 ,
        sameSite: "none",
        httpOnly: true,
        secure: true,
    }

    res.status(200).cookie("chit-chat-Admin-Token", "", cookieOptions).json({
        success: true,
        message: "Logged out Successfully ",
    });

}) 

const adminCheck = catchAsyncErrors( async( req, res, next)=>{

    res.status(200).json({
        admin: true,
        message: "Admin Check Successfully",
    })
})

const allUsers = catchAsyncErrors( async( req, res, next)=>{

    //find all Users
    const allUsers = await User.find({});

    if(!allUsers){
        return next( new errorHandler("Users Not Found",404));
    }

    //find total Users and total friends
    const countFriendPromise = [];
    const countGroupPromise = [];
    
    allUsers.forEach( ( user)=>{

        const countFriend = Chat.countDocuments({ groupChat: false, members: user._id});
        const countGroup = Chat.countDocuments({ groupChat: true, member: user._id});

        countFriendPromise.push(countFriend);
        countGroupPromise.push(countGroup);
    })

    const countFriendResult = await Promise.all(countFriendPromise);
    const countGroupResult = await Promise.all(countGroupPromise);


    //transform all users
    const allUsersWithCount = allUsers.map(( user, i)=>{
        return { 
            _id: user._id,
            name: user.name,
            username: user.username,
            avatar: user.avatar.url, 
            friends: countFriendResult[i], 
            groups: countGroupResult[i]
        };
    })

    res.status(200).json({
        success: true,
        users: allUsersWithCount
    })

})

const allChats = catchAsyncErrors( async(req, res, next)=>{

    //all chats
    const allChats = await Chat.find()
                                    .populate("members","name avatar")
                                    .populate("creator","name avatar");

    if(!allChats){
        return next( new errorHandler("Chats Not Found",404));
    }

    //total messages for each chat
    const allMessagesCountPromise = [];
    allChats.forEach( ( chat)=>{
        const messageCount = Message.countDocuments({ chat: chat._id});
        allMessagesCountPromise.push(messageCount);
    })

    const allMessagesCountResult = await Promise.all(allMessagesCountPromise);
                            
    //transformed chats
    const allTransformedChats = allChats.map( ( chat, i)=>{
    
        return {
            _id: chat._id,
            name: chat.name,
            groupChat: chat.groupChat,
            avatar: chat.members.slice(0,3).map( ( member)=>{
                return member.avatar.url;
            }),
            members: chat.members.map((member)=>{
                return{
                    _id: member._id,
                    name: member.name,
                    avatar: member.avatar.url,
                }
            }),
            creator:{
                //due to incorrect in database clear after real world data
                name: chat.groupChat ? (chat.creator ? chat.creator.name : "none") : "None",
                avatar: chat.groupChat ? (chat.creator ? chat.creator.avatar.url :"none") : "",
            },
            totalMembers: chat.members.length,
            totalMessages: allMessagesCountResult[i],
        }
    })

    res.status(200).json({
        success:true,
        chats: allTransformedChats,
    })
})

const allMessages = catchAsyncErrors( async( req, res, next)=>{

    //all Messages
    const allMessages = await Message.find()
                                            .populate("sender","name avatar")
                                            .populate("chat","groupChat");

    if(!allUsers){
        return next( new errorHandler("Messages Not Found",404));
    }                    
    
    const transformedMessages = allMessages.map(( message, i)=>{

        return {
            _id: message._id,
            attachments: message.attachments,
            content: message.content,
            sender:{
                _id: message.sender ? message.sender._id : "none",
                name:  message.sender ? message.sender.name : "none",
                avatar:  message.sender ? message.sender.avatar.url : "none",
            },
            chatId: message.chat._id,
            groupChat: message.chat.groupChat,
            time: message.createdAt, 
        }
    })

    res.status(200).json({
        success: true,
        messages: transformedMessages,
    })

})

const getDashboardStats = catchAsyncErrors( async( req, res)=>{
    
    count => allUsers, allChats, allMessages
    const [ countUsers, countChats, countMessages, countGroupChats, countDirectChats] = await Promise.all([ 
                                                                                                            User.countDocuments(), 
                                                                                                            Chat.countDocuments(), 
                                                                                                            Message.countDocuments(), 
                                                                                                            Chat.countDocuments({ groupChat: true}),
                                                                                                            Chat.countDocuments({ groupChat: false}) 
                                                                                                        ]);
    

    //last 6 days messages:-

    //get all messages include today with last 6 days
    const today = new Date( Date.now());

    const now = new Date( Date.now());
    const time_Before_Today = new Date( now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const timeFromNewToNow = now - time_Before_Today; 

    const last6Days =  new Date( Date.now() - ( 1000*60*60*24*6 + timeFromNewToNow));   // timeFromNewToNew is use to get the messages of all days of that day

    const last6DaysMessagesWithToday = await Message.find({createdAt: {$gte: last6Days, $lte: today }}).select("createdAt");
    

    //separate the messages for each day in an array
    let messages = new Array(7).fill(0);


    const time_Before_Minus1_Today = new Date( now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0);
    const time_Before_Minus2_Today = new Date( now.getFullYear(), now.getMonth(), now.getDate() - 2, 0, 0, 0);
    const time_Before_Minus3_Today = new Date( now.getFullYear(), now.getMonth(), now.getDate() - 3, 0, 0, 0);
    const time_Before_Minus4_Today = new Date( now.getFullYear(), now.getMonth(), now.getDate() - 4, 0, 0, 0);
    const time_Before_Minus5_Today = new Date( now.getFullYear(), now.getMonth(), now.getDate() - 5, 0, 0, 0);


    last6DaysMessagesWithToday.forEach((message)=>{
        //today
        if(message.createdAt > time_Before_Today){
            messages[6]++ ;  
        }
        //yesterday
        else if(time_Before_Today > message.createdAt > time_Before_Minus1_Today){
            messages[5]++ ;  
        }
        else if( time_Before_Minus1_Today > message.createdAt > time_Before_Minus2_Today){
            messages[4]++ ;  
        }
        else if( time_Before_Minus2_Today > message.createdAt > time_Before_Minus3_Today){
            messages[3]++ ;  
        }
        else if( time_Before_Minus3_Today > message.createdAt > time_Before_Minus4_Today){
            messages[2]++ ;  
        }
        else if( time_Before_Minus4_Today > message.createdAt > time_Before_Minus5_Today){
            messages[1]++ ;  
        }
        else{
            messages[0]++ ;
        }
         
    })

    const stats = {
        users: countUsers,
        chats: countChats,
        messages: countMessages,
        GroupChats: countGroupChats,
        DirectChats: countDirectChats, 
        countLast6DaysMessagesWithToday: last6DaysMessagesWithToday.length ,
        chartMessages: messages,
       
       
    }

    res.status(200).json({
        success: true,
        stats,
    })
})

export { allUsers, allChats, allMessages, getDashboardStats, adminLogin, adminLogout, adminCheck};
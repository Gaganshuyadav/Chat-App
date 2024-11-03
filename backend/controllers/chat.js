import { Chat} from "../models/chat.js";
import { User} from "../models/user.js";
import { Message} from "../models/message.js";
import { errorHandler, catchAsyncErrors} from "../middlewares/error.js"; 
import  { emitEvent} from "../utils/features.js";
import { ALERT, REFETCH_CHATS, NEW_MESSAGE, NEW_MESSAGE_ALERT } from "../constants/events.js";
import { v2 as cloudinary} from "cloudinary";  
import { getSockets } from "../lib/helper.js";
import { v4 as uuid} from "uuid";

const newGroupChat = catchAsyncErrors( async ( req, res, next)=>{
    
    const { name, members } = req.body;


    if(members.length<2){
        return next( new errorHandler("Group Chat must have at least 3 members", 400));
    }

    const allMembers = [ ...members, req.user.id];

    const chat = await Chat.create({
        name,
        members: allMembers,
        groupChat: true,
        creator: req.user._id
    })

    emitEvent( req, ALERT, allMembers, `Welcome to ${name} group`);
    emitEvent( req, REFETCH_CHATS, members);

    res.status(201).json({
        success:true,
        message:"new Group Created",
        chat,
    })

})

const getMyChats = catchAsyncErrors( async ( req, res, next)=>{

    const chats = await Chat.find({members: req.user.id}).populate("members", "name avatar");
    
    const transformedChats = chats.map((chat)=>{
        return {
            _id: chat._id,
            name: chat.name,
            members: chat.members.reduce(( prev, curr)=>{
                if( curr._id.toString() !== req.user._id.toString()){
                    prev.push(curr._id);
                }
                return prev;
              }, [])
            ,
            //conditions for group and single friend image
            avatar: chat.groupChat 
                //multiple members images
                ? (chat.members.slice(0,3).map(( member)=>{
                    return member.avatar.url;
                   })
                  )
                :
                //individual member image
                chat.members
                  .filter((member)=>{
                   return member._id.toString() !== req.user._id.toString();
                  })
                  .map( (member)=>{
                    return member.avatar.url;
                  })
                  ,
        }
    }) 


    res.status(200).json({
        success: true,
        chats: transformedChats,
    })
});

const getMyGroups = catchAsyncErrors( async( req, res, next)=>{
    const groups = await Chat.find({ groupChat: true, creator: req.user._id}).populate( "members", "name avatar");

    const transformedGroups = ( groups ? groups.map( ( group)=>{
        return {
            _id: group._id,
            name: group.name,
            avatar: group.members.slice(0,3).map( ( member)=>{
                return member.avatar.url
            })
        }
    })
    :
    []
    );

    res.status(200).json({
        success: true, 
        transformedGroups
    })
}) ;

const addMembers = catchAsyncErrors( async( req, res, next)=>{

    const { chatId, members} = req.body;


    // if(!members || members.length<1){
    //     return next( new errorHandler("Please provide members", 400));
    // }

    //find chat using chatId
    const chat = await Chat.findById( chatId);

    if(!chat){
        return next( new errorHandler("Chat Not Found", 404));
    }
    if(!chat.groupChat){
        return next(new errorHandler("This is not a group Chat",404));
    }
    if(chat.creator.toString() !== req.user._id.toString()){
        return next(new errorHandler("You are not allowed to add members", 405))
    }

    //if sender added member again then this condition not add duplicate member
    const uniqueMembers = members.filter( ( member)=>{
        return !chat.members.includes( member);
    })


    //add new members
    chat.members = [ ...chat.members, ...uniqueMembers];                                                //chat.members.push(...allNewMembers);

    //group members limit
    if( chat.members.length > 100){
        return next( new errorHandler("Group members limit reached",400));
    }
     
    //new members added in database
    const newMembers = await chat.save();


    //find names of all new members
    const allNewMembersPromise = members.map(( memberId)=>{ return User.findById( memberId) });

    const allNewMembers = await Promise.all(allNewMembersPromise);

    const allNewMembersNames = allNewMembers.map( ( member)=>{ return member.name}).join(", "); 

    emitEvent( req, ALERT, chat.members , `${allNewMembersNames} has been added in the group`);
    emitEvent( req, REFETCH_CHATS, chat.members);
    
    res.status(201).json({ 
        success: true,
        message:"members Added Successfully"
    })
})

const removeMembers = catchAsyncErrors( async( req, res, next)=>{
    
    const { chatId, userId} = req.body;

    //find chat
    const [ chat, userThatWillBeRemoved] = await Promise.all( [ Chat.findById(chatId), User.findById( userId, "name")] );

    if(!chat){
        return next( new errorHandler("chat Not Found", 404));
    }

    if(chat.creator.toString() !== req.user.id.toString()){
        return next( new errorHandler("Only Admin can remove members", 401));
    }

    //check members limit
    if( chat.members.length<=3){
        return next( new errorHandler( "Group must have at least 3 members", 400))
    }
    

    //remove member
    chat.members = chat.members.filter( ( member)=>{
        return member.toString() !== userId.toString();
    }) 

    //choose new creator
    if( userId === chat.creator.toString()){
        const randomMember = Math.floor((Math.random()*chat.members.length));
        chat.creator = chat.members[randomMember];
    }

    //save in mongo
    await chat.save();

    emitEvent( req, ALERT, chat.members, `${userThatWillBeRemoved} has been removed from the group`);
    emitEvent( req, REFETCH_CHATS, chat.members)

    res.status(200).json({
        success: true,
        message: "Member removed Successfully",
    })
})

const leaveGroup = catchAsyncErrors( async( req, res, next)=>{

    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);

    if(!chat){
        return next( new errorHandler("chat Not Found", 404));
    }

    if(!chat.groupChat){
        return next( new errorHandler("this is not a group chat", 400));
    }

    if(chat.members.length<=3){
        return next( new errorHandler("Group must have at least 3 members",400));
    }

    //remove with filter
    chat.members = chat.members.filter(( member)=>{
        return member.toString() !== req.user.id.toString();
    })

    // [choose the new creator] if user is a admin then after leave group , then at random member is selected as new admin(creator) 
    if(chat.creator.toString() === req.user.id.toString()){
        chat.creator = chat.members[ Math.floor(Math.random()*chat.members.length)]
    }

    //save and get the user name
    const [ user, save] = await Promise.all( [ User.findById( req.user.id), chat.save()]);

    emitEvent( res, ALERT, chat.members, `User ${user.name} has left the group `);

    res.status(201).json({
        success: true,
        message: "Member Leave Successfully",
    })
})

const sendAttachments = catchAsyncErrors( async( req, res, next)=>{

    const { chatId} = req.body;

    
    //get chat and user
    const chat = await Chat.findById(chatId);

    if(!req.files){
        return next( new errorHandler("Please Upload Atttachments", 400));
    }

    if(!chat){
        return next( new errorHandler("Chat Not Found", 404));
    }

    const attachments = req.files || [];

    if(attachments.length < 1){
        return next( new errorHandler("Please provide attachments", 400));
    }

    if(attachments.length > 5){
        return next( new errorHandler("Attachments should not be greater than 5", 400));
    }

    //cloudinary
    let uploadedAttachments = [];
    
    try{
        for( let i=0; i< attachments.length; i++){
            let getBase64 = `data:${attachments[i].mimetype};base64,${attachments[i].buffer.toString("base64")}`;

            //check resource type
            const cloud = await cloudinary.uploader.upload( getBase64, {
                resource_type: "auto",
                folder: "/ChatApp-01/attachments",
            })


            //database message
            const messageForDB = {
                chat: chatId,
                content: "",
                attachments: {
                    public_id: cloud.public_id,
                    url: cloud.secure_url,
                },
                sender: req.user._id,
            }

            //create Message DB
            const message = await Message.create( messageForDB);
            
            //add all attachments for real-time emit event 
            uploadedAttachments.push({ public_id: cloud.public_id, url: cloud.secure_url});
           
        }
    }
    catch(err){
        console.log(err);
        return next(new errorHandler("unable to upload",500));

    }

     //emit message
     const messageForRealTime = {
        _id: uuid(),
        chat: chatId,
        content: "",
        attachments: uploadedAttachments,
        sender: {
            _id: req.user._id,
            name: req.user.name,
        },
        createdAt: new Date().toISOString(),
    }

    // get socket id for all members
    const members = getSockets(chat.members);
    
    req.app.get("io").to(members).emit(NEW_MESSAGE, { message: messageForRealTime} );
    // emitEvent( res, NEW_MESSAGE_ALERT, chat.members, { chatId});


    res.status(200).json({
        success:true,
        message:"message Sent Successfully",
    })
})

const getChatDetails = catchAsyncErrors( async( req, res, next)=>{


    //give all chat details and also members with name, avatar

    if( req.query.populate === "true"){
        const chat = await Chat.findById( req.params.id).populate("members","name avatar").lean();

        if(!chat){
            return next( new errorHandler("Chat Not Found",404));
        }

        //change to specific format
        chat.members = chat.members.map( ( member)=>{
            return(
                {
                    _id: member._id,
                    name: member.name,
                    avatar: member.avatar.url
                }
            )
        })

        res.status(200).json({
            success: true,
            chat,
        })
    }

    //give only chatdetails
    else{
        const chat = await Chat.findById( req.params.id);

        if(!chat){
            return next( new errorHandler("Chat Not Found",404));
        }

        res.status(200).json({
            success: true,
            chat,
        })
    }
})

const renameGroup = catchAsyncErrors( async( req, res, next)=>{

    const { name} = req.body;
    const chatId = req.params.id;

    const chat = await Chat.findById( chatId);

    if(!chat){
        return next( new errorHandler("Chat not found",404));
    }

    if(!chat.groupChat){
        return next( new errorHandler( "This is not a group chat", 400));
    }

    if(chat.creator.toString() !== req.user._id.toString()){
        return next( new errorHandler("You are not allowed to rename the group",403));
    }

    chat.name = name;

    await chat.save();

    emitEvent( req, REFETCH_CHATS, chat.members );

    res.json({
        success: true,
        message: "Group renamed successfully",
    })
}) 

const deleteChat = catchAsyncErrors( async( req, res, next)=>{

    const chat = await Chat.findById( req.params.id);
     
    if(!chat){
        return next( new errorHandler( "chat not found", 404));
    }

    if(chat.groupchat && chat.creator.toString() !== req.user._id.toString()){
        console.log("kjsad")
        return next( new errorHandler("You are not allowed to delete this chat"));
    }

    if(!chat.members.includes(req.user._id)){
        return next( new errorHandler("You are not allowed to delete this chat"));
    }

    //find all attachments
    const messagesWithAttachments = await Message.find({ chat: req.params.id, attachments: { $exists: true, $ne: []}});
    
    const public_ids = [];

    messagesWithAttachments.forEach( ( message)=>{
        message.attachments.forEach( ( attachment)=>{
            public_ids.push( attachment.public_id);
        })
    })

    //delete all attachments from cloudinary later

    await Promise.all([
        chat.deleteOne(),
        Message.deleteMany({ chat: req.params.id}),

    ])

    res.status(204).json({
        success: true,
        message: "Chat deleted Successfully"
    })
})

const getMessages = catchAsyncErrors( async( req, res)=>{

    const chatId = req.params.id;
    const { page=1 } = req.query;
    
    const resultPerPage = 20;
    const skip = ( page-1)*resultPerPage;

    const [ messages, totalMessages] = await Promise.all( [
                                        Message.find({chat: chatId})
                                                    .skip( skip)
                                                    .limit( resultPerPage)
                                                    .sort({createdAt: -1})
                                                    .populate("sender","name avatar")
                                                    .lean()
                                                    ,
                                        Message.countDocuments({ chat: chatId})
                                        ]);

    const totalPages = Math.ceil( totalMessages/resultPerPage) || 0;


    res.status(200).json({
        success: true,
        messages,
        totalPages
    })
});


export { newGroupChat, getMyChats, getMyGroups, addMembers, removeMembers, leaveGroup, sendAttachments, getChatDetails, renameGroup, deleteChat, getMessages};





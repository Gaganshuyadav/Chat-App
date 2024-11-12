import AppLayout from "../component/layout/AppLayout";
import { Fragment, useRef, useState, useEffect } from "react";
import { Button, IconButton, CircularProgress, Typography} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setIsSelectedMessages, setIsConfirmationDialog} from "../redux/features/Slices/componentSlice.jsx";
import TextareaAutosize from "react-textarea-autosize";
import { AttachFile, Send, Close, Delete, } from "@mui/icons-material";
import { FileMenu} from "../component/dialogs/FileMenu.jsx";
import "./Chat.css";
import MessageComponent from "../component/shared/MessageComponent";
import { getSocket } from "../socket.jsx";
import { useParams, useNavigate} from "react-router-dom";
import { useGetChatDetailsQuery, useGetMessagesQuery, useDeleteMessagesMutation} from "../redux/api/api.jsx";
import { DELETE_ALL_MESSAGES_ALERT, DELETE_MESSAGES_ALERT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../lib/events.jsx";
import { toast} from "react-hot-toast";
import ConfirmationDialog from "../component/dialogs/ConfirmationDialog.jsx";
import { setSelectDeleteMessagesCountZero, setSelectedMessagesForDelete } from "../redux/features/Slices/messageSlice.jsx";

const Chat = () => {

  const socket = getSocket().socket;
  const params = useParams();
  const navigate = useNavigate();
  const { user} = useSelector( state=> state.user);
  const { selectDeleteMessagesCount} = useSelector(state=>state.message);
  //message and messages
  const [ message, setMessage] = useState("");
  const [ messages, setMessages] = useState([]);

  //real time typing info
  const [ typingRealInfo, setTypingRealInfo] = useState(false);
  const [ typingRealInfoMessage, setTypingRealInfoMessage] = useState("");
  const typingRef = useRef();
  const typingEndRef = useRef();

  const [ scrollMsg, setScrollMsg] = useState(1); //increment when 20 messages or more 20 messages arrives
  const [ scrollEndMsg, setScrollEndMsg] = useState(1); //when new messages comes
  
  //page
  const [ page, setPage] = useState(1);

  //ref-------to send attachments----------
  const dispatch = useDispatch();
  const { isFileMenu, isSelectedMessages, isConfirmationDialog} = useSelector( state=>state.component);
  const [ fileMenuRef, setFileMenuRef] = useState("");

  const handleIconButtonOpen = (e)=>{
    dispatch( setIsFileMenu( true));
    setFileMenuRef(e.currentTarget);
   
  }



  //get chat details------------(api)--to get members to send messages
    const chatDetails = useGetChatDetailsQuery( { chatId: params.chatId, populate: false}, { skip: !params.chatId });
  
  //get messages------------(api)
   let oldChunkMessages = useGetMessagesQuery({ chatId: params.chatId, page});

  //delete messages -----------(api)--
    let [ deleteMessages, DMResults] = useDeleteMessagesMutation();



     //setMessages with page
     useEffect(()=>{
    
        if(oldChunkMessages.currentData){
          //when load at start
          if(page===1){
            const Messages = [ ...oldChunkMessages.data.messages ];  //to show the messages in correct order
            setMessages( Messages.reverse());

            setScrollMsg( sMsg => sMsg+1); //to remember the scroll state
          }
          //when scroll previous
          else if(page!==1 && page<=oldChunkMessages.data.totalPages){
            const addMessages = [ ...oldChunkMessages.data.messages ];
            setMessages( ( messages)=> [ ...addMessages.reverse() , ...messages]);

            setScrollMsg( sMsg => sMsg+1); //to remember the scroll state
          }

          //no scrolling no message change
          else{
            setMessages((messages=>messages));
          }
        }
     }, [ oldChunkMessages]);
    



  // set Message Handler (input)----
  const sendMessageHandler = (e) =>{

    if(!message.trim()){
      return;
    }
    
    socket.emit( NEW_MESSAGE , { chatId: params.chatId, members: chatDetails?.data?.chat?.members, message: message});

    setMessage("");
    
  }



  //------------------ message handler ( feature of which user Typing)-------------------

  const handleMessageChange = (e) =>{
   
    setMessage(e.target.value);
 
    //start typing
    if(!typingRealInfo){
        socket.emit(START_TYPING, { chatId: params.chatId, members: chatDetails?.data?.chat?.members});
        
    }

    if(typingRef.current){
      clearTimeout( typingRef.current);
    
    }

    //stop typing
    typingRef.current = setTimeout(()=>{
      socket.emit(STOP_TYPING, { chatId: params.chatId, members: chatDetails?.data?.chat?.members})
      
    },2000)
    
    
  }

  // listen typing message
  useEffect(()=>{
    socket.on(START_TYPING, ( data)=>{
      if(data.chatId != params.chatId) return;
      setTypingRealInfo(true);
      setTypingRealInfoMessage(data.message);
    });

    socket.on(STOP_TYPING, ( data)=>{
      if(data.chatId != params.chatId) return;
      setTypingRealInfo(false);
      setTypingRealInfoMessage("");
    })
 
  },[socket]);


  useEffect(()=>{
   
    //this logic is for not going , if at end we can see the message
    // if(scrollRef.current && (scrollRef.current.scrollTop + scrollRef.current.clientHeight+50) > scrollRef.current.scrollHeight ){
    //   scrollRef.current.scrollTo( 0, scrollRef.current.scrollHeight);
    // }

    if(typingEndRef.current){
      typingEndRef.current.scrollIntoView({ behaviour:"smooth"})
    }

  },[typingRealInfo]);
  


  //-------------------------------------------------



  //------------------infinite Scroll feature---------------------------
  const scrollRef = useRef();
  const [ scrollHeightState, setScrollHeightState] = useState(0);
 
  //for 20 or more messages arrives
  useEffect(()=>{

    if(scrollRef.current){
      scrollRef.current.scrollTo(2, scrollRef.current.scrollHeight - scrollHeightState);
    }
  
  },[ scrollMsg]);

  //for new messages arrive
  useEffect(()=>{
    if(scrollRef.current){
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  },[ scrollEndMsg]);


  const  handleInfiScroll = (e)=>{
    //to set older scroll state
    setScrollHeightState(e.target.scrollHeight);
   
    //isFetching is the important line which stops him to load again and again
    if(scrollRef.current.scrollTop==0 && page<=oldChunkMessages?.data.totalPages &&  !oldChunkMessages?.isFetching){
      setPage( page=> page+1);
    }
    
   
  };

  //when page increases
  useEffect(()=>{
    //use Current data property of RTK query
      oldChunkMessages?.refetch();
    
  },[ page]);
  
  //---------------------end of infinite scroll---------------------------------------




  // to listen the messages ( new messages)( socket IO)----
  const newMessageEvent = ( data) =>{
     //check if chatId is same as current ChatId otherwise this message is added to another chat
     if( data.chatId!==params.chatId){
      return;
    }
    setMessages( messages => [ ...messages, data.message ]); 
    setScrollEndMsg( emsg => emsg+1);
   
  };
 
  useEffect(()=>{
    socket.on(  NEW_MESSAGE, newMessageEvent);

    //clean up
    return ()=>{
      socket.off(  NEW_MESSAGE, newMessageEvent);
    } 

  },[ socket]);



  
  //ref------ handler for deleting selected messages----------

  const {  selectedMessagesForDelete} = useSelector( state=>state.message);

  const handleDeleteAllSelectedMessages= async ()=>{

    const toastId = toast.loading("Deleting Messages...");

    try{
      const result = await deleteMessages({chatId: params.chatId , messageArray: selectedMessagesForDelete});
      console.log(result);
      if(result.data){
        toast.success("Messages Deleted Successfully", { id: toastId});
        dispatch(setIsSelectedMessages(false));
        dispatch(setSelectedMessagesForDelete([]));
        dispatch( setSelectDeleteMessagesCountZero());
        dispatch(setIsConfirmationDialog(false));
        setPage(1);
        setMessages([]);
        setMessage("");
        setScrollHeightState(0);
        setScrollEndMsg(1);
        setScrollMsg(1);
        oldChunkMessages.refetch();
       
      }
      else{
        toast.error("Something went wrong", { id: toastId});
       
      }
    }
    catch(err){
      toast.error("Something went wrong",{ id: toastId});
    }

    dispatch(setIsSelectedMessages(false));
    dispatch(setSelectedMessagesForDelete([]));
    dispatch( setSelectDeleteMessagesCountZero());
    dispatch(setIsConfirmationDialog(false));

   
  };
  


  const crossHandler = ()=>{
    dispatch( setIsSelectedMessages(false));
    dispatch( setSelectedMessagesForDelete([]));
    dispatch( setSelectDeleteMessagesCountZero());
  }

//when chat is delete from one user , it also deleted from another user, link socket

//alert for delete selected messages for refetch 
  const socketDeleteMessagesAlert = ( data)=>{
    if(data.chatId!==params.chatId){
      return;
    }
    if( user && user._id===data.user){
      return;
    }
    toast.success(data.message);
    setPage(1);
    setMessages([]);
    setMessage("");
    setScrollHeightState(0);
    setScrollEndMsg(1);
    setScrollMsg(1);
    oldChunkMessages.refetch();
 
  };

  useEffect(()=>{

    socket.on( DELETE_MESSAGES_ALERT, socketDeleteMessagesAlert);

    return ()=>{
      socket.off( DELETE_MESSAGES_ALERT, socketDeleteMessagesAlert);
    }

  },[socket]);

  
//alert for clear all messages for refetch 
const socketDeleteAllMessagesAlert = ( data)=>{
  if(data.chatId!==params.chatId){
    return;
  }
  if( user && user._id!==data.user){
    toast.success(data.message);
  }
  
  setPage(1);
  setMessages([]);
  setMessage("");
  setScrollHeightState(0);
  setScrollEndMsg(1);
  setScrollMsg(1);
  oldChunkMessages.refetch();

};

useEffect(()=>{

  socket.on( DELETE_ALL_MESSAGES_ALERT, socketDeleteAllMessagesAlert);

  return ()=>{
    socket.off( DELETE_ALL_MESSAGES_ALERT, socketDeleteAllMessagesAlert);
  }

},[socket]);

const { isUserLogoutConfirmation} = useSelector(state=>state.component);

console.log(isUserLogoutConfirmation);
  
  //------------------------


  
  //------reset all states when go to another chat re-renders----------------
  useEffect(()=>{

    return ()=>{
      setPage(1);
      setMessages([]);
      setMessage("");
      setScrollHeightState(0);
      setScrollEndMsg(1);
      setScrollMsg(1);
      dispatch( setIsSelectedMessages(false));
      dispatch( setSelectedMessagesForDelete([]));
      dispatch( setSelectDeleteMessagesCountZero());
    }
    
    
  },[params.chatId]);



  //if user write a id of chat and it is not preseant in that chat then redirect to home page
  if(chatDetails?.data){
    if(!chatDetails?.data?.chat?.members.includes(user?._id.toString())){
       navigate("/");
    }
  }



  //show errors with useEffect----
  useEffect(()=>{

    if( chatDetails?.isError){
      console.log(chatDetails);
      toast.error( chatDetails.error.data.message || "Something Went Wrong");
    }


    if(oldChunkMessages?.isError){
      toast.error( oldChunkMessages.error.data.message || "Something Went Wrong");
    }

  },[ chatDetails]);


    return (
      <Fragment>

        {/* messages */}
        <div className="messagesRender" ref={scrollRef} onScroll={handleInfiScroll} style={{height:"87%", overflow:"auto", display:"flex", flexDirection:"column", padding:"5px 14px"}}>
      
            {/* loading */}
            {
              (oldChunkMessages?.isFetching  || chatDetails?.isFetching) && (
            
              <div style={{alignSelf:"center"}}>
                  <CircularProgress sx={{color:"rgb(250, 125, 103)"}} />
              </div>
              )
            
            }

            {
              messages?.map( ( m, idx)=>{
                return <MessageComponent key={idx} message={m} user={ user && user} />
              })
            }


             {/* typing info */}
             {
               typingRealInfo
               ?
               (<div ref={typingEndRef}>
                 <Typography sx={{color:"orange", fontSize:"20px", padding:"0 0 6px 10px"}}>{typingRealInfoMessage}</Typography>
               </div>)
             :
             ""
             }

        </div>

      {
        isSelectedMessages
        ?
        <>
        {/* delete messages select toggle */}
         <div style={{height:"13%", transition:"2s all", backgroundColor:"rgb(250, 125, 103)", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            {/* open dialog */}
            {/* cross-icon */}
            <IconButton onClick={()=>{ dispatch(setIsSelectedMessages(false))}} sx={{ marginLeft:"20px"}}>
                <Close onClick={crossHandler} sx={{fontSize:"30px", color:"black"}}/>
            </IconButton>
            {/* message count */}
            <Typography >{ selectDeleteMessagesCount > 1 ? `${ selectDeleteMessagesCount} messages`: `${ selectDeleteMessagesCount} message` } selected</Typography>
            
            {/* delete button */}
                <IconButton onClick={()=>{dispatch(setIsConfirmationDialog(true)) } } sx={{ marginRight:"80px"}} disabled={ !(selectDeleteMessagesCount > 0)} >
                    <Delete sx={{fontSize:"30px",color:"black", opacity: selectDeleteMessagesCount > 0 ? "1" : "0.3" }}/>
                </IconButton>

            {/* dialog */}
            <ConfirmationDialog title={"Delete Confirmation"} content={`delete ${selectDeleteMessagesCount} messages`} handler={ handleDeleteAllSelectedMessages} loading={ DMResults?.isLoading} />
         </div>
        </>
        :
        <>
        {/* input messages */}
        <div className="sendMessage" style={{height:"13%", display:"flex", flexDirection:"row" , alignItems:"center" , backgroundColor:"white"}}>
          
          {/* attach file icon */}
            <div  className="attachFileIcon">
                <IconButton onClick={handleIconButtonOpen}> 
                    <AttachFile/>
  
                </IconButton>       
            </div>

             {/* input */}
            <form >
              <TextareaAutosize 
                  value={message} 
                  onChange={ handleMessageChange}
                  maxRows={3} 
                  minRows={1} 
                  spellCheck={false}
                  placeholder="Type Message Here..."
              />
            </form>

             {/* send icon */}
            <div className="sendIcon">
              <IconButton onClick={sendMessageHandler}>
                  <Send/>
              </IconButton>
            </div>

        </div>

        {/* File Menu */}
        <FileMenu anchorEl={ fileMenuRef} />
      </>

      }

      </Fragment>
    )
  }
  
export default AppLayout()(Chat);




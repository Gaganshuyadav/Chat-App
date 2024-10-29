import AppLayout from "../component/layout/AppLayout";
import { Fragment, useRef, useState, useEffect } from "react";
import { Button, IconButton, CircularProgress} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu} from "../redux/features/Slices/componentSlice.jsx";
import TextareaAutosize from "react-textarea-autosize";
import { AttachFile, Send} from "@mui/icons-material";
import { FileMenu} from "../component/dialogs/FileMenu.jsx";
import "./Chat.css";
import MessageComponent from "../component/shared/MessageComponent";
import { getSocket } from "../socket.jsx";
import { useParams} from "react-router-dom";
import { useGetChatDetailsQuery, useGetMessagesQuery} from "../redux/api/api.jsx";
import { NEW_MESSAGE } from "../lib/events.jsx";
import { toast} from "react-hot-toast";

const Chat = () => {

  const socket = getSocket().socket;
  const params = useParams();
  const { user} = useSelector( state=> state.user);
  //message and messages
  const [ message, setMessage] = useState("");
  const [ messages, setMessages] = useState([]);

  const [ scrollMsg, setScrollMsg] = useState(1); //increment when 20 messages or more 20 messages arrives
  const [ scrollEndMsg, setScrollEndMsg] = useState(1); //when new messages comes
  
  //page
  const [ page, setPage] = useState(1);

  //ref-------to send attachments----------
  const dispatch = useDispatch();
  const { isFileMenu} = useSelector( state=>state.component);
  const [ fileMenuRef, setFileMenuRef] = useState("");

  const handleIconButtonOpen = (e)=>{
    dispatch( setIsFileMenu( true));
    setFileMenuRef(e.currentTarget);
   
  }

  //------------------------



  //get chat details------------(api)--to get members to send messages
    const chatDetails = useGetChatDetailsQuery( { chatId: params.chatId, populate: false}, { skip: !params.chatId} );
  
  //get messages------------(api)
   let oldChunkMessages = useGetMessagesQuery({ chatId: params.chatId, page});

   console.log("1111 chatDetails: ",chatDetails.status);
   console.log(chatDetails);
   console.log("2222 oldChunkMessages:",chatDetails.status);
   console.log(oldChunkMessages);


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
    



  // set Message Handler(input)----
  const sendMessageHandler = (e) =>{

    if(!message.trim()){
      return;
    }
    
    socket.emit( NEW_MESSAGE , { chatId: params.chatId, members: chatDetails?.data?.chat?.members, message: message});

    setMessage("");
    
  }



  //infinite Scroll feature---------------------------
  const scrollRef = useRef();
  const [ scrollHeightState, setScrollHeightState] = useState(0);
 
  //for 20 or more messages arrives
  useEffect(()=>{

    if(scrollRef.current){
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight - scrollHeightState);
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
   
    if(scrollRef.current.scrollTop<1 && page<=oldChunkMessages.data.totalPages){
      setPage( page=> page+1);
    }
    
   
  };

  //when page increases
  useEffect(()=>{
    //use Current data property of RTK query
      oldChunkMessages.refetch();
    
  },[ page]);
  
  //---------------------end of infinite scroll---------------------------------------




  // to listen the messages( socket IO)----
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


  
  //------reset all states when go to another chat re-renders----------------
 
  useEffect(()=>{

    return ()=>{
      setMessages([]);
      setMessage("");
      setScrollMsg(1);
      setScrollEndMsg(1);
      setScrollHeightState(0);
      setPage(1)
    }
    
  },[params.chatId]);

  
  //show errors with useEffect----
  useEffect(()=>{

    if( chatDetails?.isError){
      toast.error( chatDetails.error.data.message || "Something Went Wrong");
    }


    if(oldChunkMessages?.isError){
      toast.error( oldChunkMessages.error.data.message || "Something Went Wrong");
    }

  },[ chatDetails]);
  
  

    return (
      <Fragment>

        {/* messages */}
        <div className="messagesRender" ref={scrollRef} onScroll={handleInfiScroll} style={{height:"87%", overflow:"auto", border:"2px solid green", display:"flex", flexDirection:"column", padding:"5px 14px"}}>
      
      {
        (oldChunkMessages.isLoading  || chatDetails.isLoading) && (
      
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

        </div>



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
                  onChange={ ( e)=>{ setMessage(e.target.value)}}
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

      </Fragment>
    )
  }
  
export default AppLayout()(Chat);




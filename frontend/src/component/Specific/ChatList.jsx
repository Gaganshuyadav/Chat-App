import ChatItem from "../shared/ChatItem";
import { Box} from "@mui/material";
import "../styles/shared.css";
import { useParams, useNavigate } from "react-router-dom";

export default function ChatList({ chats}){

    const params = useParams();
    const navigate = useNavigate();

    //if chatId in the URL is incorrect then redirect to "/"
    if(params.chatId && chats && chats.length!==0){
        const findChatId = chats?.filter((chat)=>{
          return chat._id.toString()=== params.chatId;
      })

      if(findChatId.length===0){
        navigate("/");
      }
    }
    
    
    return(
        <>
        {/* chatList element */}
        <Box className="chatListSpecific" sx={{border:"1px solid blue", height:"100%", width:{xs:"70vw", sm:"100%"},  overflowY:"auto" }}>
        {
            chats && chats.map( ( chat, idx)=>{
                return <ChatItem key={idx} idx={idx} chat={ chat}/>
            })
        }
        </Box> 
        </>
        
    )
}
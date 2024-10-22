import ChatItem from "../shared/ChatItem";
import { Box} from "@mui/material";
import "../styles/shared.css";

export default function ChatList({ chats}){
 


    return(
        <Box className="chatListSpecific" sx={{border:"1px solid blue", height:"100%", width:{xs:"70vw", sm:"100%"},  overflowY:"auto" }}>
        {
            chats && chats.map( ( chat, idx)=>{
                return <ChatItem key={idx} idx={idx} chat={ chat} />
            })
        }
        </Box> 
    )
}
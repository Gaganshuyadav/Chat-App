import { memo} from "react";
import { AvatarGroup, Box, Avatar, Typography} from "@mui/material";
import { Link, useParams} from "react-router-dom";

const ChatItem = ( { chat, idx//avatar=[],//name,//_id,//groupChat = false,//sameSender,//isOnline,//newMessage,//index=0,//handleDeleteChatOpen,
}) => {

  const params = useParams();

  return (
    <Link 
        to={`/chat/${chat._id}`} 
        style={{textDecoration:"none", color:"black", }}
    >
      <Box 
          sx={{ 
              backgroundColor: `${chat._id}`===params.chatId ? "black" : "white", 
              color: `${chat._id}`===params.chatId ? "white":"black", 
              display:"flex", 
              alignItems:"start",
              padding:"10px 30px 10px 1px","&:hover":{backgroundColor: `${chat._id}`!==params.chatId ? "rgba(0, 0, 0, 0.274)":"black" },}}
      >
        
        <Box sx={{position:"relative", border:"1px solid red"}}>
          <AvatarGroup max={3} sx={{"& .MuiAvatar-root":{marginLeft:"-32px"}, marginLeft:"13px"}}>
            {
              chat && chat.avatar.map((avtr,i)=>{
                return <Avatar key={i} src={ avtr} alt={ chat.members[i]} sx={{width:"45px", height:"45px"}}/>
              })
            }
          </AvatarGroup>
          <Box sx={{ position:"absolute", top:"5px", left:"15px" , width:"10px", height:"10px", backgroundColor:"green", borderRadius:"50%"}}></Box>
        </Box> 

        <Typography sx={{ marginLeft:"19px", fontSize:"17px"}}>{ chat.name}</Typography>
      </Box>
    </Link>
  )

}

export default memo(ChatItem);

import { memo} from "react";
import { AvatarGroup, Box, Avatar, Typography} from "@mui/material";
import { Link, useParams} from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { removeMessagesAlert } from "../../redux/features/Slices/notifySlice";
import { setCurrentChat } from "../../redux/features/Slices/chatSlice";

const ChatItem = ( { chat, idx}) => {

  const params = useParams();
  const dispatch = useDispatch();
  const {  newMessagesAlert} = useSelector( state=>state.notify);

  //if user open the same chat then alerts should be deleted or not shown
  if( newMessagesAlert?.find((alert)=>{ return alert.chatId === params.chatId}) ){
    dispatch( removeMessagesAlert( params.chatId));
  }


  //set current chat id with information, so that user can delete or leave the group
  if(params.chatId===chat._id){
    dispatch( setCurrentChat(chat));
  }

  return (
    <Link 
        to={`/chat/${chat._id}`} 
        style={{textDecoration:"none", color:"black"}}
        onContextMenu={(e)=>{e.preventDefault()}}
    >
      <Box 
          sx={{ 
              backgroundColor: `${chat._id}`===params.chatId ? "black" : "white", 
              color: `${chat._id}`===params.chatId ? "white":"black", 
              display:"flex", 
              alignItems:"start",
              padding:"10px 30px 10px 1px","&:hover":{backgroundColor: `${chat._id}`!==params.chatId ? "rgba(0, 0, 0, 0.274)":"black" },}}
      >
        
        <Box sx={{position:"relative"}}>
          {/* avatar box */}
          <AvatarGroup max={3} sx={{"& .MuiAvatar-root":{marginLeft:"-32px"}, marginLeft:"13px"}}>
            {
              chat && chat.avatar.map((avtr,i)=>{
                return <Avatar key={i} src={ avtr} alt={ chat.members[i]} sx={{width:"45px", height:"45px"}}/>
              })
            }
          </AvatarGroup>
          <Box sx={{position:"absolute", top:"5px", left:"15px" , width:"10px", height:"10px", backgroundColor:"green", borderRadius:"50%"}}></Box>
        </Box> 

        {/* username and alert box */}
        <Box >
            <Typography sx={{  marginLeft:"19px", fontSize:"17px", fontWeight:"500"}}>{ chat.name}</Typography>
            <Typography sx={{  marginLeft:"19px", fontSize:"14px", color:"green"}}>
              { newMessagesAlert && newMessagesAlert.find((alert,idx)=>{ 
                   return alert.chatId === chat._id;
                })
                ?
                `${newMessagesAlert.find((alert,idx)=>{ return alert.chatId === chat._id }).count} new message` 
                :
                ""
              } 
            </Typography>
        </Box>

        
      </Box>
    </Link>
  )

}

export default memo(ChatItem);

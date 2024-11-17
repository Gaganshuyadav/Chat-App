import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton } from '@mui/material';

import AddIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/RemoveCircle";

const UserItem = ({ 
  user, 
  handler, 
  handlerIsLoading=false, 
  isAdded=false, 
  styling={},
  firstIcon = ""
}) => {

  
  return (
        <ListItem sx={styling}>
          <ListItemAvatar>
             <Avatar key={user._id} sx={{ width:"50px", height:"50px"}} src={user.avatar} alt="userImage"/>
          </ListItemAvatar>
          <ListItemText sx={{marginLeft:"10px"}}>
            {user.name}
          </ListItemText>
          <IconButton 
          sx={{padding:"0"}}
            onClick={(e)=>{handler(user._id)}}
            disabled={handlerIsLoading}
          >{
            isAdded
            ?
            <RemoveIcon sx={{ 
                          borderRadius:"50%", fontSize:"44px", color: "black", transition:"all 500ms",
                          ":hover":{ color:"rgb(58, 55, 55)"} 
                        }}
            />
            :
            (firstIcon ? firstIcon : (<AddIcon sx={{ 
                         borderRadius:"50%", fontSize:"44px", color: handlerIsLoading ? "gray" : "rgb(78, 78, 243)",transition:"all 500ms",
                         ":hover":{ color:"rgb(160, 160, 245)"} 
                      }}
            />)
            )
            
          }
              
          </IconButton>
        </ListItem>
  )
}

export default UserItem;
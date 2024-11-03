import { useState,memo} from 'react'
import { Dialog, DialogTitle, Box, Typography, ListItem, ListItemAvatar, ListItemText, Avatar, TextField, CircularProgress,  Button, ListItemButton} from "@mui/material";
import { useDispatch, useSelector} from "react-redux";
import { setIsNotification} from "../../redux/features/Slices/componentSlice.jsx";
import { useGetNotificationsQuery, useAcceptFriendRequestMutation} from "../../redux/api/api.jsx";
import { toast} from "react-hot-toast";

const Notifications = () => {

  const dispatch = useDispatch();
  const {  isNotification} = useSelector( state=> state.component );

  const { data, isLoading, isError, isSuccess, refetch} = useGetNotificationsQuery();
  const [ acceptFriendRequest] = useAcceptFriendRequestMutation();


  const [ isLoadingSendFriendRequest, setIsLoadingSendFriendRequest ] = useState(false);

  let addFriendsHandler = async ( sendData) =>{

    setIsLoadingSendFriendRequest( true);
    const toastId = toast.loading(" Loading...");

      try{
        const result = await acceptFriendRequest( sendData);
        if( result.data && result.data.success===true){
          toast.success( result.data.message, { id: toastId});
          console.log(result);
          refetch();
        }
        else if( result.error && result.error.data.success===true){
  
          console.log(result)
          toast.error( result.error.data.message, { id: toastId});
          refetch();
        }
        else{
          toast.error("Something Went Wrong", { id: toastId});
          console.log(result)
        }
        setIsLoadingSendFriendRequest(false);
      }
     catch(err){
      toast.error("Something Went Wrong", { id: toastId});
      setIsLoadingSendFriendRequest(false);
    }
  }

  


  return (
    <Dialog open={ isNotification} onClose={()=>{ dispatch( setIsNotification(false))}}>
      <Box sx={{width:{xs:"80vw",sm:"60vw",md:"50vw",lg:"30vw"}}}>

        <DialogTitle sx={{color:"rgb(153, 151, 151)"}}>Notifications</DialogTitle>

        {
          isLoading
          ?
          <Box sx={{ height:"200px", display:"flex", alignItems:"center", justifyContent:"center"}}>
              <CircularProgress sx={{color:"black"}}/>
          </Box>
          :
          <Box className="notifications" sx={{width:"95%", margin:"0 auto"}}>
          {
            data && data.notifications.length>0 
                ? 
                <>
                <Box>
                {
                  data.notifications.map((info)=>{
                    return <NotificationItem key={info._id} _id={info._id} name={info.name} avatar={info.avatar} handler={addFriendsHandler} isFSLoading = { isLoadingSendFriendRequest}/>
                  })
                }
                </Box>
                </> 
                : 
                <Typography>0 Notifications</Typography>
          }
        </Box>
        }
        
      </Box>
    </Dialog>
  )
}

const NotificationItem = memo(( { _id, name, avatar, handler, isFSLoading } )=>{
  return(
    <ListItem>
      <ListItemAvatar>
             <Avatar key={_id} sx={{ width:"40px", height:"40px"}} src={ avatar} alt="userImage"/>
          </ListItemAvatar>
          <ListItemText sx={{ overflow:"hidden",textOverflow:"ellipsis"}}>
              <Typography 
                sx={{ overflow:"hidden",
                textOverflow:"ellipsis",
              }}
              >
                {name}
             </Typography>
             <Typography 
                sx={{fontSize:"14px",color:"gray"}}
              >
              friend request
              </Typography>
              
      </ListItemText>
    <Box sx={{ position:"relative", right:"0", display:"flex", flexDirection:{xs:"column",sm:"row"}}}>
        <Button color="success" onClick={()=>handler({ requestId: _id, accept:true})} disabled={isFSLoading} >ACCEPT</Button>
        <Button color="error" onClick={()=>handler({ requestId: _id, accept:false})} disabled={isFSLoading} >REJECT</Button>
      </Box>
    </ListItem>
  )
})

export default Notifications
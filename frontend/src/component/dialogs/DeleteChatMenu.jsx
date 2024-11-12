import { Menu, MenuItem, Typography } from "@mui/material";
import  { useDispatch, useSelector} from "react-redux";
import { setIsContextMenuDeleteChatDialog, setIsSelectedMessages, setIsDeleteChatConfirmationMenuDialog, setIsLeaveGroupConfirmationMenuDialog, setIsDeleteGroupConfirmationMenuDialog, setIsClearAllMessagesConfirmationMenuDialog } from "../../redux/features/Slices/componentSlice";
import { Delete, ExitToApp, CheckBox, RemoveCircleOutline } from "@mui/icons-material";
import { useDeleteChatMutation, useLeaveGroupMutation, useDeleteMessagesMutation } from "../../redux/api/api";
import { toast} from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import DeleteChatConfirmationMenuDialog from "./DeleteChatConfirmationMenuDialog";
import DeleteGroupConfirmationMenuDialog from "./DeleteGroupConfirmationMenuDialog";
import LeaveGroupConfirmationMenuDialog from "./LeaveGroupConfirmationMenuDialog";
import ClearAllMessagesConfirmationMenuDialog from "./ClearAllMessagesConfirmationMenuDialog";

export default function DeleteChatMenu( { anchorEl} ){

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const { currentChat} = useSelector( state=>state.chat);
    const { user} = useSelector( state=>state.user);
    const { isContextMenuDeleteChatDialog, isSelectedMessages } = useSelector( state=>state.component);

    //delete chat --api
    const [ deleteChat, deleteChatResult] = useDeleteChatMutation();

    //leave group --api
    const [ leaveGroup, leaveGroupResult] = useLeaveGroupMutation();

    //clear all messages
    const [ deleteMessages, DMResult] = useDeleteMessagesMutation();


    //handle delete chat or delete group
    const handleDeleteChat= async ()=>{
        
        let toastId;
        if(currentChat.groupChat){
            toastId = toast.loading("Deleting Group...");
        }
        else{
            toastId = toast.loading("Deleting Chat...");
        }

        try{
            const result = await deleteChat(params.chatId);
            if(result.data){
                  if(currentChat.groupChat){
                      toast.success("Group Deleted Successfully",{id: toastId});
                      dispatch( setIsContextMenuDeleteChatDialog(false));
                      dispatch( setIsDeleteGroupConfirmationMenuDialog(false));
                      navigate("/");
                  }
                  else{
                      toast.success("Chat Deleted Successfully",{ id: toastId});
                  }
            }
            else{
                toast.error(result.error.data.message,{ id: toastId});
            }
        }
        catch(err){
            toast.error("Something went wrong",{id: toastId});
        }

        dispatch( setIsContextMenuDeleteChatDialog(false));
        dispatch( setIsDeleteChatConfirmationMenuDialog(false));
        dispatch( setIsDeleteGroupConfirmationMenuDialog(false));
    };


    // handle leave group
    const handleLeaveGroup = async ()=>{
        

        const toastId = toast.loading("Leave Group...");

        try{
            const result = await leaveGroup( params.chatId);
            if(result.data){
                toast.success("You Leave the Group Successfully",{id: toastId});
                dispatch( setIsContextMenuDeleteChatDialog(false));
                dispatch( setIsLeaveGroupConfirmationMenuDialog(false));
                navigate("/");
            }
            else{
                toast.error(result?.error?.data?.message, { id: toastId});
            }
        }
        catch(err){
            console.log(err);
            toast.error("Something went wrong", { id: toastId} );
        }

        dispatch( setIsContextMenuDeleteChatDialog(false));
        dispatch( setIsLeaveGroupConfirmationMenuDialog(false));
    }


    //handle selected members box toggle
    const handleSelectedMembers = ( ) =>{
        dispatch( setIsSelectedMessages(true));
        dispatch(setIsContextMenuDeleteChatDialog(false));
    };

    //handle clear all messages
    const handleClearAllMessages = async ()=>{

        const toastId = toast.loading("Deleting All Messages...");
        try{
            const result = await deleteMessages({ chatId: params.chatId, messageArray:[], all: true});
            if(result.data){
                toast.success("All Messages Deleted Successfully",{ id: toastId});
               
            }
            else{

                toast.error("Something went wrong",{id: toastId});
              
            }
        }
        catch(err){
            toast.error("Something went wrong",{ id: toastId});
          
        }  

        dispatch( setIsContextMenuDeleteChatDialog(false));
        dispatch( setIsClearAllMessagesConfirmationMenuDialog(false));

    };
  
    
    return (
        <>
        <Menu 
          open={isContextMenuDeleteChatDialog} 
          anchorEl={anchorEl} 
          onClose={()=>{ dispatch( setIsContextMenuDeleteChatDialog(false))}}
          anchorOrigin={{ vertical:"bottom", horizontal:"left"}}
          transformOrigin={{ vertical:"top", horizontal:"center"}}
          PaperProps={{
            style:{
                marginTop:"20px"
            }
          }}
        >
            {/* select messages*/}
            <MenuItem onClick={ handleSelectedMembers} sx={{"&:hover":{ backgroundColor:"gray", color:"white"}}}>
                 <CheckBox/>
                <Typography sx={{padding:"2px", marginRight:"6px"}}>Select messages</Typography>
            </MenuItem>

            {/* delete all messages*/}
              <>
              <MenuItem onClick={()=>{dispatch( setIsClearAllMessagesConfirmationMenuDialog(true))}} sx={{"&:hover":{ backgroundColor:"gray", color:"white"}}}>
                 <RemoveCircleOutline/>
                <Typography sx={{padding:"2px", marginRight:"6px"}}>Clear Chat </Typography>
              </MenuItem>
              <ClearAllMessagesConfirmationMenuDialog handler={ handleClearAllMessages} loading={DMResult?.isLoading}/>
              </>

            {/* delete chat( two person chat) */}
               {
                currentChat?.groupChat===false && (
                    <>
                    <MenuItem onClick={()=>{ dispatch(setIsDeleteChatConfirmationMenuDialog(true))}} sx={{"&:hover":{ backgroundColor:"red",color:"white"}}}>
                      <Delete/>
                      <Typography sx={{padding:"2px", marginRight:"6px"}}>Delete Chat</Typography>
                    </MenuItem> 
                    <DeleteChatConfirmationMenuDialog handler={handleDeleteChat} loading={deleteChatResult?.isLoading}/>
                    </>
                )
               }
                
               {/* delete group( only admin) */}
               {
                currentChat?.groupChat===true && currentChat.creator===user._id && (
                    <>
                    <MenuItem onClick={()=>{ dispatch(setIsDeleteGroupConfirmationMenuDialog(true))}} sx={{"&:hover":{ backgroundColor:"red",color:"white"}}}>
                       <Delete/>
                      <Typography sx={{padding:"2px", marginRight:"6px"}}>Delete Group</Typography>
                    </MenuItem>
                    <DeleteGroupConfirmationMenuDialog handler={handleDeleteChat} loading={deleteChatResult?.isLoading}/>
                    </>
                )
               }

               {/* leave group( anyone leave group, and if admin leave group the new admin will set, logic already coded in BACKEND */}
                {
                    currentChat?.groupChat===true && (
                         <>
                        <MenuItem onClick={ ()=>{ dispatch(setIsLeaveGroupConfirmationMenuDialog(true))}} sx={{"&:hover":{ backgroundColor:"red",color:"white"}}}>
                          <ExitToApp/>
                          <Typography sx={{padding:"2px", marginRight:"6px"}}>Leave Group</Typography>
                       </MenuItem>
                       <LeaveGroupConfirmationMenuDialog handler={handleLeaveGroup} loading={leaveGroupResult?.isLoading}/>
                       </>

                    )
                }
                
        </Menu>
        </>
    )
}
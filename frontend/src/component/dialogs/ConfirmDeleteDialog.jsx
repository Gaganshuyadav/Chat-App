import { DialogTitle, Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch} from "react-redux";
import { setIsDeleteGroup } from '../../redux/features/Slices/componentSlice';
import { useDeleteChatMutation } from '../../redux/api/api';
import { toast} from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const ConfirmDeleteDialog = ( { chatId}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDeleteGroup} = useSelector( state=> state.component);

  
  // delete Group --api
  const [ deleteChat, deteteGroupResult] = useDeleteChatMutation();

  //delete handler
  const handleDeleteGroup = async () =>{
    
    const toastId = toast.loading("Deleting Group...");

    try{
      const result = await deleteChat(chatId);
           console.log(result);
           if(result.data){
            toast.success(result?.data?.message, { id: toastId});
            dispatch( setIsDeleteGroup(false));
            
            //to clear the page after deleting the current group and redirect to group list
            navigate("/groups");
           
          }
          else{
            toast.error(toast?.error?.data?.message, { id: toastId});
            dispatch( setIsDeleteGroup(false));
          }
    }
    catch(err){
      toast.error("Something went wrong", { id: toastId});
      console.log(err);
      dispatch( setIsDeleteGroup(false));
    }
     

  };


  return (
    <div>
        <Dialog open={ isDeleteGroup} onClose={ ()=>{dispatch(setIsDeleteGroup(false))}} >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>Are you sure you want to delete this group?</DialogContent>
            <DialogActions>
                <Button color="primary" onClick={()=>{dispatch( setIsDeleteGroup(false))}} >NO</Button>
                <Button color="error" onClick={ handleDeleteGroup} >YES</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default ConfirmDeleteDialog;
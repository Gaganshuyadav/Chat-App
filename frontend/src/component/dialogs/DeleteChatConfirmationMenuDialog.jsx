import { Dialog, DialogTitle, Button, DialogActions, DialogContent } from "@mui/material"; 
import {useSelector, useDispatch  } from "react-redux";
import { setIsDeleteChatConfirmationMenuDialog } from "../../redux/features/Slices/componentSlice";


export default function ConfirmationDialog( { handler, loading=false}){

    const { isDeleteChatConfirmationMenuDialog} = useSelector(state=>state.component);
    const dispatch = useDispatch();
 

    return(
        <Dialog open={ isDeleteChatConfirmationMenuDialog} onClose={()=>{dispatch(setIsDeleteChatConfirmationMenuDialog(false))}}>
           <DialogTitle>Delete Chat</DialogTitle>
           <DialogContent>Are you sure you want to Delete Chat</DialogContent>
           <DialogActions>
            <Button onClick={handler} sx={{color:"rgb(250, 125, 103)"}} disabled={loading}>yes</Button>
           <Button onClick={()=>{ dispatch(setIsDeleteChatConfirmationMenuDialog(false))}} sx={{color:"rgb(250, 125, 103)"}} disabled={loading}>No</Button>
           </DialogActions>
        </Dialog>
    )
}




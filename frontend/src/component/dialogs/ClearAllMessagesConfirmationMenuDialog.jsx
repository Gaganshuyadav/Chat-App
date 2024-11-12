import { Dialog, DialogTitle, Button, DialogActions, DialogContent } from "@mui/material"; 
import {useSelector, useDispatch  } from "react-redux";
import { setIsClearAllMessagesConfirmationMenuDialog } from "../../redux/features/Slices/componentSlice";


export default function ConfirmationDialog( { handler, loading=false}){

    const { isClearAllMessagesConfirmationMenuDialog} = useSelector(state=>state.component);
    const dispatch = useDispatch();
 

    return(
        <Dialog open={ isClearAllMessagesConfirmationMenuDialog} onClose={()=>{dispatch(setIsClearAllMessagesConfirmationMenuDialog( false))}}>
           <DialogTitle>Clear Chat</DialogTitle>
           <DialogContent>Are you sure you want to Clear Chat</DialogContent>
           <DialogActions>
            <Button onClick={handler} sx={{color:"rgb(250, 125, 103)"}} disabled={loading}>yes</Button>
           <Button onClick={()=>{ dispatch(setIsClearAllMessagesConfirmationMenuDialog(false))}} sx={{color:"rgb(250, 125, 103)"}} disabled={loading}>No</Button>
           </DialogActions>
        </Dialog>
    )
}


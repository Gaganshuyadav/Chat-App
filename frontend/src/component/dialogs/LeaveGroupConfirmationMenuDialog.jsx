import { Dialog, DialogTitle, Button, DialogActions, DialogContent } from "@mui/material"; 
import {useSelector, useDispatch  } from "react-redux";
import { setIsLeaveGroupConfirmationMenuDialog } from "../../redux/features/Slices/componentSlice";


export default function ConfirmationDialog( { handler, loading=false}){

    const { isLeaveGroupConfirmationMenuDialog} = useSelector(state=>state.component);
    const dispatch = useDispatch();
 

    return(
        <Dialog open={ isLeaveGroupConfirmationMenuDialog} onClose={()=>{dispatch(setIsLeaveGroupConfirmationMenuDialog(false))}}>
           <DialogTitle>Leave Group</DialogTitle>
           <DialogContent>Are you sure you want to Leave the Group</DialogContent>
           <DialogActions>
            <Button onClick={handler} sx={{color:"rgb(250, 125, 103)"}} disabled={loading}>yes</Button>
           <Button onClick={()=>{ dispatch(setIsLeaveGroupConfirmationMenuDialog(false))}} sx={{color:"rgb(250, 125, 103)"}} disabled={loading}>No</Button>
           </DialogActions>
        </Dialog>
    )
}




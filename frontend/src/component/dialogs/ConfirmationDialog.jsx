import { Dialog, DialogTitle, Button, DialogActions, DialogContent } from "@mui/material"; 
import {useSelector, useDispatch  } from "react-redux";
import { setIsConfirmationDialog } from "../../redux/features/Slices/componentSlice";

export default function ConfirmationDialog({ title, content, handler, loading=false}){

    const { isConfirmationDialog} = useSelector(state=>state.component);
    const dispatch = useDispatch();
 

    return(
        <Dialog open={ isConfirmationDialog} onClose={()=>{dispatch(setIsConfirmationDialog(false))}}>
           <DialogTitle>{title}</DialogTitle>
           <DialogContent>Are you sure you want to {content}</DialogContent>
           <DialogActions>
            <Button onClick={handler} sx={{color:"rgb(250, 125, 103)"}} disabled={loading}>yes</Button>
           <Button onClick={()=>{ dispatch(setIsConfirmationDialog(false))}} sx={{color:"rgb(250, 125, 103)"}} disabled={loading}>No</Button>
           </DialogActions>
        </Dialog>
    )
}




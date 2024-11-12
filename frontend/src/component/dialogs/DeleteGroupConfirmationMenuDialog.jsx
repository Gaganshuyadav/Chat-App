import { Dialog, DialogTitle, Button, DialogActions, DialogContent } from "@mui/material"; 
import {useSelector, useDispatch  } from "react-redux";
import { setIsDeleteGroupConfirmationMenuDialog } from "../../redux/features/Slices/componentSlice";


export default function ConfirmationDialog( { handler, loading=false}){

    const { isDeleteGroupConfirmationMenuDialog} = useSelector(state=>state.component);
    const dispatch = useDispatch();
 

    return(
        <Dialog open={ isDeleteGroupConfirmationMenuDialog} onClose={()=>{dispatch(setIsDeleteGroupConfirmationMenuDialog(false))}}>
           <DialogTitle>Delete Group</DialogTitle>
           <DialogContent>Are you sure you want to Delete the Group</DialogContent>
           <DialogActions>
            <Button onClick={handler} sx={{color:"rgb(250, 125, 103)"}} disabled={loading}>yes</Button>
           <Button onClick={()=>{ dispatch(setIsDeleteGroupConfirmationMenuDialog(false))}} sx={{color:"rgb(250, 125, 103)"}} disabled={loading}>No</Button>
           </DialogActions>
        </Dialog>
    )
}




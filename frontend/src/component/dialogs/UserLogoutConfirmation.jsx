import { Dialog, DialogTitle, Button, DialogActions, DialogContent } from "@mui/material"; 
import {useSelector, useDispatch  } from "react-redux";
import { setIsUserLogoutConfirmation } from "../../redux/features/Slices/componentSlice";


export default function UserLogoutConfirmation( { handler, loading=false}){

    const { isUserLogoutConfirmation} = useSelector(state=>state.component);
    const dispatch = useDispatch();
 

    return(
        <Dialog open={ isUserLogoutConfirmation } onClose={()=>{dispatch(setIsUserLogoutConfirmation(false))}}>
           <DialogTitle>Logout</DialogTitle>
           <DialogContent>Are you sure you want to Logout from Chit-Chat</DialogContent>
           <DialogActions>
            <Button onClick={handler} sx={{color:"rgb(250, 125, 103)"}} disabled={loading}>yes</Button>
           <Button onClick={()=>{ dispatch(setIsUserLogoutConfirmation(false))}} sx={{color:"rgb(250, 125, 103)"}} disabled={loading}>No</Button>
           </DialogActions>
        </Dialog>
    )
}



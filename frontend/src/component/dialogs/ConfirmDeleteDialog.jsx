import { DialogTitle, Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch} from "react-redux";
import { setIsDeleteGroup } from '../../redux/features/Slices/componentSlice';

const ConfirmDeleteDialog = ( ) => {

  const dispatch = useDispatch();
  const { isDeleteGroup} = useSelector( state=> state.component);

  return (
    <div>
        <Dialog open={ isDeleteGroup} onClose={ ()=>{dispatch(setIsDeleteGroup(false))}} >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>Are you sure you want to delete this group?</DialogContent>
            <DialogActions>
                <Button color="primary" onClick={()=>{dispatch(setIsDeleteGroup(false))}} >NO</Button>
                <Button color="error" onClick={()=>{dispatch(setIsDeleteGroup(false))}} >YES</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default ConfirmDeleteDialog;
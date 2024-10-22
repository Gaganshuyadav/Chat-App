import { DialogTitle, Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import React from 'react'

const ConfirmDeleteDialog = ( { open, handleClose, deleteHandler }) => {
  return (
    <div>
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>Are you sure you want to delete this group?</DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleClose}>NO</Button>
                <Button color="error" onClick={deleteHandler}>YES</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default ConfirmDeleteDialog;
import { useState, useEffect} from 'react';
import { DialogTitle, Dialog, DialogContent, DialogActions, Button, Box, CircularProgress } from '@mui/material';
import UserItem from '../shared/UserItem';
import { setIsAddedGroup } from '../../redux/features/Slices/componentSlice';
import { useSelector, useDispatch} from "react-redux";
import { toast} from "react-hot-toast";
import { useAddGroupMembersMutation, useGetMyFriendsQuery } from '../../redux/api/api';

const AddMemberDialog = ( { chatId }) => {


    //add group members --api
    const [ addGroupMembers, addGMResult] = useAddGroupMembersMutation();
   
    //get my friends --api
    const getMyFriends = useGetMyFriendsQuery( chatId);
    console.log(getMyFriends);
  


    const { isAddedMember} = useSelector( state=>state.component);
    const dispatch = useDispatch();

    const [ selectedMembers, setSelectedMembers] = useState([]);
  console.log(selectedMembers);

    //submit handler for adding members
    const addMemberSubmitHandler = async () =>{

        if(selectedMembers.length <1){
            toast.error("Please Add Members"); 
            dispatch( setIsAddedGroup(false));
            return;
        }

        const toastId = toast.loading("Adding Members...")
        
        try{
            const result = await addGroupMembers({ chatId, members: selectedMembers});
            
            if(result.data){
                if(selectedMembers.length<2){
                    toast.success("member Added Successfully",{ id: toastId});
                    dispatch( setIsAddedGroup(false));
                }
                else{
                    toast.success("members Added Successfully",{ id: toastId});
                    dispatch( setIsAddedGroup(false));
                }
            }
            else{
                toast.error(toast?.error?.data?.message, { id: toastId});
                dispatch( setIsAddedGroup(false));
            }
            
        }
        catch(err){
            toast.error("Something went wrong");
            dispatch( setIsAddedGroup(false));
        }

        
        
    };
    

    //toggle group members ID
    let selectMemberHandler = (_id) =>{

        if(selectedMembers.includes(_id)){
            setSelectedMembers(prev=>prev.filter((id)=> id !== _id));
        }
        else{
            setSelectedMembers(prev=>[ ...prev, _id]);
        }
      };

      useEffect(()=>{
            getMyFriends.refetch();
      },[chatId]);

    return (
    <div>
        <Dialog open={isAddedMember} onClose={()=>dispatch( setIsAddedGroup(false))}>
            <DialogTitle>Add Member</DialogTitle>
            {
                getMyFriends.isLoading
                ?
                <Box sx={{ height:"200px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <CircularProgress sx={{color:"black"}}/>
                </Box>
                :
                (
                <>
                    {
                        getMyFriends?.data?.availableFriends?.length>0 
                        ?
                        getMyFriends?.data?.availableFriends?.map( (user)=>{
                            return(
                                <UserItem user={ user} handler={selectMemberHandler} isAdded={ selectedMembers.includes(user._id)}  />
                            )
                        })
                        :
                        <DialogContent>No Friends</DialogContent>
                    }
                    <DialogActions>
                        <Box sx={{ margin:{xs:"1rem",sm:"2rem"}}}>
                            <Button color="error" onClick={()=>{ dispatch( setIsAddedGroup(false))}}>CANCEL</Button>
                            <Button onClick={addMemberSubmitHandler} color="primary" variant="contained" disabled={ addGMResult.isLoading} sx={{ marginLeft:"1rem"}}>SUBMIT CHANGES</Button>
                        </Box>
                    </DialogActions>
                </>

                )
            }
        </Dialog>
    </div>
  )
}

export default AddMemberDialog
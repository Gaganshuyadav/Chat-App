import { useState} from 'react';
import { DialogTitle, Dialog, DialogContent, DialogActions, Button, Box } from '@mui/material';
import UserItem from '../shared/UserItem';

const AddMemberDialog = ( { addMember, isLoadingAddMember, chatId }) => {

    const users = [
        { name: "gagan yadav", _id: "1", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
        { name: "aman yadav", _id: "2", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
        { name: "deepak yadav", _id: "3", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
        { name: "anshu yadav", _id: "4", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    ];

    const [ selectedMembers, setSelectedMembers] = useState([]);
    const [ members, setMembers] = useState(users);

    const addFriendHandler = ( id)=>{
        console.log(id,chatId);
    }
    const addMemberSubmitHandler = () =>{
        console.log("sub");
    }
    const closeHandler = ()=>{
        console.log("close");
    }

    let selectMemberHandler = (_id) =>{

        if(selectedMembers.includes(_id)){
            setSelectedMembers(prev=>prev.filter((id)=> id !== _id));
        }
        else{
            setSelectedMembers(prev=>[ ...prev, _id]);
        }
      };

    return (
    <div>
        <Dialog open={true} onClose={closeHandler}>
            <DialogTitle>Add Member</DialogTitle>
            {
                users.length>0 
                ?
                users.map( (user)=>{
                    return(
                        <UserItem user={ user} handler={selectMemberHandler} isAdded={ selectedMembers.includes(user._id)}  />
                    )
                })
                :
                <DialogContent>No Friends</DialogContent>
            }
            <DialogActions>
                <Box sx={{ margin:{xs:"1rem",sm:"2rem"}}}>
                    <Button color="error">CANCEL</Button>
                    <Button onClick={addMemberSubmitHandler} color="primary" variant="contained" disabled={isLoadingAddMember} sx={{ marginLeft:"1rem"}}>SUBMIT CHANGES</Button>
                </Box>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default AddMemberDialog
import { useState} from "react";
import { Dialog, DialogTitle, TextField, Box, List, Button, Typography} from "@mui/material";
import UserItem from '../shared/UserItem';

const NewGroup = () => {

  const users = [
                 { name: "gagan yadav", _id: "1", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
                 { name: "aman yadav", _id: "2", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
                 { name: "deepak yadav", _id: "3", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
                 { name: "anshu yadav", _id: "4", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
                 { name: "gagan ", _id: "5", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
                 { name: "aman yadav", _id: "6", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
                 { name: "deepak yadav", _id: "7", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
                 { name: "anshu yadav", _id: "8", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          ]
  

  const [ selectedMembers, setSelectedMembers] = useState([]);
  const [ members, setMembers] = useState(users);

  let isLoadingSendFriendRequest = false;

  let selectMemberHandler = (_id) =>{

    //1.
    //setSelectedMembers( prev=> prev.includes(_id) ? prev.filter((id)=> id !== _id) : [...prev, _id] ); 
    //2. 
    //setMembers( prev=>prev.map((user)=> user._id===_id ? { ...user, isAdded: !user.isAdded}))

    if(selectedMembers.includes(_id)){
        setSelectedMembers( prev=>prev.filter((id)=> id !== _id));
    }
    else{
        setSelectedMembers(prev=>[ ...prev, _id]);
    }

  }
  console.log(selectedMembers);

  return (
    <Dialog open={true}  >
      <Box sx={{width:{xs:"80vw",sm:"60vw",md:"50vw",lg:"30vw"}}}>
        <DialogTitle sx={{textAlign:"center", fontSize:"2.4rem", fontWeight:"400",color:"rgb(73, 72, 72)"}}>New Group</DialogTitle>

        < div className="notifications" style={{ width:"100%", display:"flex", alignItems:"center", margin:"0 auto"}} >
          <TextField 
              type="text"  
              style={{ margin:"auto", width:"80%"}} 
              placeholder="Group Name"
          />
        </div>

        <Box className="users" sx={{width:"90%", margin:"0 auto"}}>
          <Typography sx={{padding:"20px 0 5px 18px"}}>Members</Typography>
        <List>
          {
            members && members.map((user)=>{
              return(
                    <UserItem key={user._id} user={ user} handler={ selectMemberHandler} isAdded={ selectedMembers.includes(user._id)} /> 
              )
            })
          }
          </List>
          <Box sx={{ width:"80%", margin:"1.5rem auto",display:"flex", justifyContent:"space-evenly", alignItems:"center"}}>
            <Button color="error" variant="text" size="large" >CANCEL</Button>
            <Button color="primary" variant="contained" size="large" sx={{letterSpacing:"1px"}}>CREATE</Button>
          </Box>
        </Box>

      </Box>
    </Dialog>
  )
}

export default NewGroup
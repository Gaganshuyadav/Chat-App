import { useState, useEffect } from "react";
import { Dialog, DialogTitle, TextField, Box, List, Button, Typography} from "@mui/material";
import UserItem from '../shared/UserItem';
import { useGetMyFriendsQuery, useMakeNewGroupMutation } from "../../redux/api/api";
import { toast} from "react-hot-toast";
import { setIsNewGroup } from "../../redux/features/Slices/componentSlice";
import  { useDispatch, useSelector} from "react-redux";

const NewGroup = () => {

  const dispatch = useDispatch();
  const { isNewGroup} = useSelector( state=>state.component);

  //get my friends
  const getMyFriends = useGetMyFriendsQuery();

  // make new group
  const [ makeNewGroup, makeNewGroupAdded] = useMakeNewGroupMutation();
 
  const [ groupName, setGroupName] = useState("");
  const [ selectedMembers, setSelectedMembers] = useState([]);

  //select members handler
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

  //create New Group
  const handleCreateNewGroup = async () =>{

    //name required
    if( !groupName.trim()){
      toast.error("Group Name is required");
      return;
    }

    //members length
    if( selectedMembers.length < 2 ){
      toast.error("Please Select at least 2 members");
      dispatch( setIsNewGroup( false));
      return;
    }

    const toastId = toast.loading("New Group Creating...");
    try{
      const result = await makeNewGroup({ name: groupName, members: selectedMembers});
      if(result.data){
        toast.success(result.data.message,{ id: toastId});
        dispatch( setIsNewGroup( false));
      }
      else{
        toast.error(result.error.data.message ||"Something went wrong", { id: toastId});
        dispatch( setIsNewGroup( false));
      }
    }
    catch(err){
      toast.dismiss();
      dispatch( setIsNewGroup( false));
    }

  };




  //for errors
  useEffect(()=>{

    if(getMyFriends.isError){
      toast.error( getMyFriends?.error?.data?.message || "Something went wrong");
    }

  },[getMyFriends]);
  

  return (
    <Dialog open={ isNewGroup} onClose={ ()=>{ dispatch( setIsNewGroup(false))}}>
      <Box sx={{width:{xs:"80vw",sm:"60vw",md:"50vw",lg:"30vw"}}}>
        <DialogTitle sx={{textAlign:"center", fontSize:"2.4rem", fontWeight:"400",color:"rgb(73, 72, 72)"}}>New Group</DialogTitle>

        < div className="notifications" style={{ width:"100%", display:"flex", alignItems:"center", margin:"0 auto"}} >
          <TextField 
              type="text"  
              value={ groupName}
              onChange={ (e)=>{ setGroupName(e.target.value)}}
              style={{ margin:"auto", width:"80%"}} 
              placeholder="Group Name"
          />
        </div>

        <Box className="users" sx={{width:"90%", margin:"0 auto"}}>
          <Typography sx={{padding:"20px 0 5px 18px"}}>Members</Typography>
        <List>
          {
            getMyFriends.data && getMyFriends.data.allMyFriends.map((user)=>{
              return(
                    <UserItem key={user._id} user={ user} handler={ selectMemberHandler} isAdded={ selectedMembers.includes(user._id)} /> 
              )
            })
          }
          </List>
          <Box sx={{ width:"80%", margin:"1.5rem auto",display:"flex", justifyContent:"space-evenly", alignItems:"center"}}>
            <Button color="error" variant="text" size="large" onClick={ ()=>{ dispatch( setIsNewGroup(false))}} >CANCEL</Button>
            <Button color="primary" variant="contained" size="large" onClick={ handleCreateNewGroup} disabled={ makeNewGroupAdded.isLoading} sx={{letterSpacing:"1px"}} >CREATE</Button>
          </Box>
        </Box>

      </Box>
    </Dialog>
  )
}

export default NewGroup
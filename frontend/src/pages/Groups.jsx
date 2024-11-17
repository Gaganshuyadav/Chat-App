import { useState, memo, useEffect, Suspense, lazy} from 'react';
import { Link, useNavigate , useSearchParams} from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { Done, Edit, KeyboardBackspace, Menu, Add, Delete} from '@mui/icons-material';
import { IconButton, Box, Tooltip, Drawer, Typography, Avatar, AvatarGroup, TextField, Button, Backdrop} from "@mui/material";
const ConfirmDeleteDialog = lazy(()=>import("../component/dialogs/ConfirmDeleteDialog"));
const AddMemberDialog = lazy(()=>import("../component/dialogs/AddMemberDialog"));
import { getSocket} from "../socket";
import { useAddGroupMembersMutation, useGetChatDetailsQuery, useGetMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/api/api';
import { toast} from "react-hot-toast";
import { useDispatch, useSelector} from "react-redux";
import { setIsAddedGroup, setIsDeleteGroup, setIsMobile } from '../redux/features/Slices/componentSlice';
import { PersonRemove} from "@mui/icons-material";

export default function Groups(){

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { user} = useSelector( state => state.user );
   const {  isAddedMember, isDeleteGroup, isMobile} = useSelector( state=>state.component);
   //chatId
   const chatId  = useSearchParams()[0].get("group");

  //get my groups --api
  const myGroups = useGetMyGroupsQuery();

  //get Chat Details --api
  const getChatDetails = useGetChatDetailsQuery({ chatId, populate: true },{skip: !chatId});
 
  //rename group --api
  const [ renameGroup, renameGResult] = useRenameGroupMutation();

  //remove group members --api
  const [ removeGroupMember, removeGMResult] = useRemoveGroupMemberMutation();

  const [ isEdit, setIsEdit] = useState(false);
  const [ groupName, setGroupName] = useState("");
  const [ updatedGroupName, setUpdatedGroupName] = useState("");
  
  //back to home
  const handleBackButton = () =>{
    navigate("/");
  }


  //remove member handler-api
  const removeMemberHandler = async ( id)=>{
    
    const toastId = toast.loading("Loading...");
    try{
      const result = await removeGroupMember({ chatId, userId: id});
      if(result.data){
        toast.success("Group Member deleted Successfully",{ id: toastId});

            //if admin delete themselves 
            if(user._id.toString() === id){
                navigate("/groups");
            }
        }
      else{
        toast.error(result.error.data.message,{ id: toastId});
      }
    }
    catch(err){
      console.log(err);
      toast.error("Something Went wrong",{ id: toastId});
    }

  };




  //rename group-api
  const handleChangeGroupName= async ()=>{

    if( !updatedGroupName.trim()){
      return toast.error("Group Name is required");
    }

    const toastId =  toast.loading("Updating Group Name...");

    try{
      const result = await renameGroup({ name: updatedGroupName, chatId});
      
      
      if(result.data){
        toast.success("Group renamed Successfully",{ id: toastId});
        setGroupName(updatedGroupName.trim());
      }
      else{
        toast.error(result?.error?.data.message,{ id: toastId});
      }
    }
    catch(err){
      toast.error("Something Went wrong",{ id: toastId});
    }

    setIsEdit(false);
  };


  
  // to set group name when chatId change
  useEffect(()=>{
    if(chatId){
      setGroupName( getChatDetails?.data?.chat?.name);
      setUpdatedGroupName( getChatDetails?.data?.chat?.name);
    }
    
    //cleanUp functions
    return ()=>{
      setGroupName("");
      setUpdatedGroupName("");
      setIsEdit(false);
      
    }
  }, [getChatDetails]);



//components
  const IconBtns = (
      <>
      <div style={{position:"relative"}}>

        <div style={{position:"absolute", top:"4rem", left:"2rem"}}>
            <Tooltip title="back">
                <IconButton 
                    sx={{backgroundColor:"black", color:"white", "&:hover":{backgroundColor:"rgb(68, 67, 67)", transition:"all 300ms"}}}
                    onClick={handleBackButton}
                >
                  <KeyboardBackspace/>
                </IconButton>
            </Tooltip>
        </div>

        <Box sx={{ display:{xs:"block", sm:"none"} ,position:"fixed", right:"1rem", top:"1.5rem"}}>
            <IconButton 
            sx={{ ":hover":{color:"black", transition:"all 300ms"}}}
            onClick={ ()=>{dispatch(setIsMobile(true))} }
            >
              <Menu/>
            </IconButton>
        </Box>
      </div>
      </>
  )
  
  const GroupName = (
    <div style={{height:"22vh", display:"flex", justifyContent:"center", alignItems:"end"}}>
      {
        isEdit
        ?
        <>
        <TextField value={updatedGroupName} onChange={(e)=>{ setUpdatedGroupName( e.target.value)}} />
        <IconButton  onClick={ handleChangeGroupName} disabled={renameGResult.isLoading}>
          <Done/>
        </IconButton>
        </>
        :
        <>
        <Typography variant="h4">{groupName}</Typography>
        <IconButton onClick={()=>{setIsEdit(true)}} disabled={renameGResult.isLoading}>
          <Edit/>
        </IconButton>
        </>
      }
    </div>
  )

  const ButtonGroup = (
    <>
      <Box 
        sx={{ 
          backgroundColor:"white", 
          height:"16vh", 
          display:"flex",
          flexDirection:{ xs:"column-reverse",sm:"row"}, 
          justifyContent:"center", 
          alignItems:"center"
        }}>

          <Button color={"error"} onClick={()=>{ dispatch(setIsDeleteGroup(true))}} >
            <Delete/>
            <Typography sx={{fontWeight:"500"}}>DELETE GROUP</Typography>
          </Button>

          <Button sx={{backgroundColor:"black", margin:{xs:"1rem 0 0.6rem 0", sm:"0 0 0 1rem"}, "&:hover":{backgroundColor:"rgba(57,56,56,1)"}}} onClick={()=>{dispatch( setIsAddedGroup(true))}} variant="contained">
            <Add/>
            <Typography>ADD MEMBER</Typography>
          </Button>
      </Box>
    </>
  )
  return (
    <div>
      
      <Grid container sx={{ height:"100vh"}}>
        
        {/* for other than mobiles---- */}
        <Grid 
            size={{ xs:0, sm:4}} 
            sx={{ 
                backgroundImage: "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)" ,
                display:{ xs:"none", sm:"block"},
              }}
        >
          <GroupList myGroups={ myGroups?.data?.transformedGroups} chatId={chatId}/>
        </Grid>

        {/* for mobiles---- */}
        <Drawer 
            sx={ { display:{ xs:"block", sm:"none"}}} 
            open={ isMobile} 
            onClose={()=>{dispatch( setIsMobile(false))}} 
        >
          <div style={{ height:"100%", width:"60vw",backgroundImage: "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)" }}>
            <GroupList myGroups={ myGroups?.data?.transformedGroups} chatId={chatId} />
          </div>
        </Drawer>

        {/* main screen---- */}
        <Grid size={{ xs:12,sm:8}} >
          
          {/* icon buttons at the top */}
          { IconBtns}
          
          {/* groupName with update */}
          { getChatDetails?.currentData?.chat && GroupName}

          {/* members */}
          { getChatDetails?.currentData?.chat && <Typography variant="h6" sx={{margin:{xs:"1.5rem 0 1rem 2rem", sm:"1rem 0 0.6rem 7rem"}}}>Members</Typography> } 
          {
            getChatDetails?.currentData?.chat &&
            <Box 
              sx={{
                height:"45vh",
                width:"100%",
                overflow:"auto",
                padding:{ xs:"0.5rem 2rem 0 2rem", sm:"2rem 7rem"},
              }}
          >
            {/* chat members */}
            <Box > 
              {
                getChatDetails?.currentData?.chat?.members.length  >0 && getChatDetails?.data?.chat?.members.map((user)=>{
                  return <GroupMember user={ user} handler={ removeMemberHandler} handlerIsLoading={ removeGMResult.isLoading} />
                })
              }
            </Box>
          </Box>
          }

          {/* to add and delete the members */}
          { getChatDetails?.currentData?.chat && ButtonGroup}
        </Grid>

      </Grid>

      {/*Dialogs for delete and add members */}
      {
        isAddedMember &&  (
          <Suspense fallback={<Backdrop open />}>
             <AddMemberDialog chatId={chatId}/>
          </Suspense>
        )
      }
 {/* //addMember, isLoadingAddMember, chatId */}
      {
        isDeleteGroup && (
          <Suspense fallback={<Backdrop open />}>
             <ConfirmDeleteDialog chatId={chatId}/>
          </Suspense>
        )
      }
    </div>
  )
}


const GroupList = ( { w="100%", myGroups, chatId}) =>{

  
  return (
    <div style={{ backgroundImage: "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)"  }}>
      {
         myGroups?.length > 0 
        ?
        <div style={{height:"100vh", overflow:"auto"}}> 
           { myGroups.map( ( group, idx)=>{
              return(
                  <GroupListItem key={idx} chatId={ chatId} group={group} />
                )
             })
           }
        </div>
        :
        <Typography sx={{padding:"2rem"}}>No Groups</Typography>
      }
    </div>
  )
}

const GroupListItem =  memo( ({ group, chatId}) =>{

  const { name, avatar, _id} = group;

  return (
    <Link to={`?group=${_id}`} onClick={ (e)=>{ if(chatId===_id){ e.preventDefault(); }}} style={{textDecoration:"none"}}>
      <Box sx={{padding:"0.7rem", boxSizing:"border-box", backgroundColor:chatId===_id ? "black": "none", "&:hover":{backgroundColor: chatId===_id ? "black" : "rgba(14, 13, 13, 0.363)"}}}>
      
        <Box sx={{display:"flex", justifyContent:"start", alignItems:"center"}}>
            
              <AvatarGroup max={3} sx={{"& .MuiAvatar-root":{marginLeft:"-32px"}, marginLeft:"13px"}}>
                {
                  avatar?.map((avtr,i)=>{
                    return <Avatar  key={i} src={ avtr} sx={{width:"45px", height:"45px"}} />
                  })
                }
              </AvatarGroup>
            
            
            <Typography sx={{color: chatId===_id ? "white": "black", marginLeft:"1rem"}}>{name}</Typography>
        </Box>
      
      </Box>
    </Link>
  )
})


const GroupMember = ( { user, handler, handlerIsLoading})=>{
  return(
    <>
    <Box sx={{ borderBottom:"1px solid rgba(224,224,224,1)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"5px", width:"90%", margin:"0px auto", "&:hover":{backgroundColor:"rgba(224,224,224,1)"} }}>
      
      <div style={{display:"flex", alignItems:"center", padding:"5px", width:"80%"}}>
          <Avatar src={user?.avatar} sx={{width:"60px",height:"60px", marginLeft:"2%"}} />
          <Typography sx={{margin:"0% 6%"}}>{user?.name}</Typography>
      </div>
      <IconButton onClick={()=>{handler(user?._id)}} disabled={handlerIsLoading} sx={{alignSelf:"center",  marginRight:"10px", backgroundColor:"red", color:"black", "&:hover":{ backgroundColor:"black", color:"red", width:"45px", height:"45px", transition:" 1000ms all"}}}><PersonRemove/></IconButton>
    </Box>
    </>
  )
}
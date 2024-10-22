import { useState, memo, useEffect, Suspense, lazy} from 'react';
import { Link, useNavigate , useSearchParams} from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import UserItem from '../component/shared/UserItem';
import { Done, Edit, KeyboardBackspace, Menu, Add, Delete} from '@mui/icons-material';
import { IconButton, Box, Tooltip, Drawer, Typography, Avatar, AvatarGroup, TextField, Button, Backdrop} from "@mui/material";
const ConfirmDeleteDialog = lazy(()=>import("../component/dialogs/ConfirmDeleteDialog"));
const AddMemberDialog = lazy(()=>import("../component/dialogs/AddMemberDialog"));
import { getSocket} from "../socket";

export default function Groups(){

  //fake group data
  const myGroups = [
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "John Doe",
      _id: "1",
      groupChat: false,
      members: ["1", "2"],
    },
    {avatar: ["https://www.w3schools.com/howto/img_avatar.png"],name: "John Boi",_id: "2",groupChat: true,members: ["1", "2"],},
    {avatar: ["https://www.w3schools.com/howto/img_avatar.png"],name: "John Boi",_id: "2",groupChat: true,members: ["1", "2"],},
    {avatar: ["https://www.w3schools.com/howto/img_avatar.png"],name: "John Boi",_id: "2",groupChat: true,members: ["1", "2"],},
    {avatar: ["https://www.w3schools.com/howto/img_avatar.png"],name: "John Boi",_id: "2",groupChat: true,members: ["1", "2"],},
    {avatar: ["https://www.w3schools.com/howto/img_avatar.png"],name: "John Boi",_id: "2",groupChat: true,members: ["1", "2"],},
    {avatar: ["https://www.w3schools.com/howto/img_avatar.png"],name: "John Boi",_id: "2",groupChat: true,members: ["1", "2"],},
    {avatar: ["https://www.w3schools.com/howto/img_avatar.png"],name: "John Boi",_id: "2",groupChat: true,members: ["1", "2"],},
    {avatar: ["https://www.w3schools.com/howto/img_avatar.png"],name: "John Boi",_id: "2",groupChat: true,members: ["1", "2"],},
    {avatar: ["https://www.w3schools.com/howto/img_avatar.png"],name: "John Boi",_id: "2",groupChat: true,members: ["1", "2"],},
    {avatar: ["https://www.w3schools.com/howto/img_avatar.png"],name: "John Boi",_id: "2",groupChat: true,members: ["1", "2"],},
    {avatar: ["https://www.w3schools.com/howto/img_avatar.png"],name: "John Boi",_id: "2",groupChat: true,members: ["1", "2"],},
    {avatar: ["https://www.w3schools.com/howto/img_avatar.png"],name: "John Boi",_id: "2",groupChat: true,members: ["1", "2"],},
    {avatar: ["https://www.w3schools.com/howto/img_avatar.png"],name: "John Boi",_id: "2",groupChat: true,members: ["1", "2"],},
   
  ];
 
  
  const users = [
    { name: "gagan yadav", _id: "1", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},{ name: "aman yadav", _id: "2", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},{ name: "deepak yadav", _id: "3", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},{ name: "anshu yadav", _id: "4", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},{ name: "gagan ", _id: "1", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},{ name: "aman yadav", _id: "2", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},{ name: "deepak yadav", _id: "3", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},{ name: "anshu yadav", _id: "4", groupChat: false, members: ["1","2"], avatar: "https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
]




  const navigate = useNavigate();
  const chatId  = useSearchParams()[0].get("group");

  const [ isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [ isEdit, setIsEdit] = useState(false);
  const [ groupName, setGroupName] = useState("");
  const [ updatedGroupName, setUpdatedGroupName] = useState("");
  const [ confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  //take temporarily because use after from redux
  const isAddMember=false;

  const handleBackButton = () =>{
    navigate("/");
  }

  //for modile responsiveness
  const handleMobileMenuOpen = () =>{
    setIsMobileMenuOpen( prev=>(!prev))
  }

  const handleMobileMenuClose = () =>{
    setIsMobileMenuOpen( prev=>(!prev))
  }

  //delete dialog
  const openConfirmDeleteHandler = ()=>{
    setConfirmDeleteDialog(true);
  }
  const closeConfirmDeleteHandler = () =>{
    setConfirmDeleteDialog(false);
  }

  const deleteHandler = () =>{
    console.log("deleteHandler");
    setConfirmDeleteDialog(false);
  }

  //add member dialog
  const openAddMemberHandler = ()=>{
    console.log("open");
  }
  const closeAddMemberHandler = ()=>{
    console.log("close");
  }

  

  //useEffect
  useEffect(()=>{
    if(chatId){
      setGroupName(`group Name ${chatId}`);
      setUpdatedGroupName(`group Name ${chatId}`);
    }
    
    //cleanUp functions
    return ()=>{
      setGroupName("");
      setUpdatedGroupName("");
      setIsEdit(false);
    }
  }, [chatId]);


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
            onClick={handleMobileMenuOpen}
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
        <TextField value={updatedGroupName} />
        <IconButton  onClick={()=>{setIsEdit(false)}}>
          <Done/>
        </IconButton>
        </>
        :
        <>
        <Typography variant="h4">{groupName}</Typography>
        <IconButton onClick={()=>{setIsEdit(true)}}>
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

          <Button color={"error"} onClick={openConfirmDeleteHandler} >
            <Delete/>
            <Typography sx={{fontWeight:"500"}}>DELETE GROUP</Typography>
          </Button>

          <Button color="primary" onClick={ openAddMemberHandler} variant="contained"  sx={{margin:{xs:"1rem 0 0.6rem 0", sm:"0 0 0 1rem"}}}>
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
          <GroupList myGroups={myGroups} chatId={chatId}/>
        </Grid>

        {/* for mobiles---- */}
        <Drawer 
            sx={ { display:{ xs:"block", sm:"none"}}} 
            open={ isMobileMenuOpen} 
            onClose={ handleMobileMenuClose} 
        >
          <div style={{ height:"100%", width:"60vw",backgroundImage: "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)" }}>
            <GroupList myGroups={myGroups} chatId={chatId} />
          </div>
        </Drawer>

        {/* main screen---- */}
        <Grid size={{ xs:12,sm:8}} >
          
          {/* icon buttons at the top */}
          { IconBtns}
          
          {/* groupName with update */}
          { groupName && GroupName}

          {/* members */}
          { groupName && <Typography variant="h6" sx={{margin:{xs:"1.5rem 0 1rem 2rem", sm:"1rem 0 0.6rem 7rem"}}}>Members</Typography> } 
          {
            groupName &&
            <Box 
              sx={{
                height:"45vh",
                width:"100%",
                overflow:"auto",
                padding:{ xs:"0.5rem 2rem 0 2rem", sm:"2rem 7rem"},
              }}
          >
            <Box > 
              {
                users.length>0 && users.map((user)=>{
                  return <UserItem user={user} styling={{ borderRadius:"10px", margin:"0 0 30px 0", boxShadow:"0 0 8px -1px gray" }}/>
                })
              }
              
            </Box>
          </Box>
          }

          {/* to add and delete the members */}
          { groupName && ButtonGroup}
        </Grid>

      </Grid>

      {/*Dialogs for delete and add members */}
      {
        isAddMember &&  (
          <Suspense fallback={<Backdrop open />}>
             <AddMemberDialog/>
          </Suspense>
        )
      }

      {
        confirmDeleteDialog && (
          <Suspense fallback={<Backdrop open />}>
             <ConfirmDeleteDialog
                  open={ confirmDeleteDialog}
                  handleClose={ closeConfirmDeleteHandler}
                  deleteHandler={ deleteHandler}
              />
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
        myGroups.length > 0 
        ?
        <div style={{height:"100vh", overflow:"auto"}}> 
           {myGroups.map( ( group, idx)=>{
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
    <Box sx={{padding:"0.7rem", boxSizing:"border-box", "&:hover":{backgroundColor:"rgba(14, 13, 13, 0.363)"}}}>
      <Link to={`?group=${_id}`} onClick={ (e)=>{ if(chatId===_id){ e.preventDefault(); }}} style={{textDecoration:"none"}}>
        <Box sx={{display:"flex", justifyContent:"start", alignItems:"center"}}>
            <Avatar src={avatar} />
            <Typography sx={{color:"black", marginLeft:"1rem"}}>{name}</Typography>
        </Box>
      </Link>
    </Box>
  )
})
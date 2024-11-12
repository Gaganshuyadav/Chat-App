import { lazy, Suspense, useState, useEffect} from 'react';
import { useNavigate, useParams} from "react-router-dom"; 
/*mui icons */
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import ProfileIcon from "@mui/icons-material/AccountCircle";
import MoreOption from "@mui/icons-material/MoreVert";
/*mui components */
import { IconButton, Tooltip, Typography, Backdrop, Badge, Box } from "@mui/material";
//dialogs
const Notifications = lazy( ()=> import("../Specific/Notifications.jsx"));
const NewGroup = lazy(()=>import("../Specific/NewGroup.jsx"));
const SearchDialog = lazy(()=>import("../Specific/SearchDialog.jsx"));
//logics
import { useDispatch, useSelector} from "react-redux";
import { logout} from "../../redux/features/thunks/user.jsx";
import { clearError, clearSuccess} from "../../redux/features/Slices/userSlice.jsx";
import { toast} from "react-hot-toast";
import { setIsMobile, setIsSearch, setIsNotification, setIsNewGroup,  setIsContextMenuDeleteChatDialog, setIsConfirmationDialog, setIsUserLogoutConfirmation} from "../../redux/features/Slices/componentSlice.jsx";
import { resetNotificationCount } from '../../redux/features/Slices/notifySlice.jsx';
//leave or delete chat
import DeleteChatMenu from '../dialogs/DeleteChatMenu.jsx';
import UserLogoutConfirmation from '../dialogs/UserLogoutConfirmation.jsx';

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const { isMobile, isSearch, isNotification, isNewGroup, isContextMenuDeleteChatDialog} = useSelector( state=>state.component);
    const { isLogin, success, error, isLoading} = useSelector( state=>state.user);
    const { user} = useSelector( state=> state.user);
    const { notificationCount} = useSelector( state=> state.notify);
    const [ anchorEl, setAnchorEl] = useState(null);

    const handleManageGroups = () =>{
        navigate("/groups");
    }

    const handleLogout = () =>{
        dispatch( logout());
        dispatch(setIsUserLogoutConfirmation(false));
    }

    const handleMenu = () =>{
        dispatch( setIsMobile(true));
    } 
    const openSearch = () =>{
        dispatch( setIsSearch(true));
    }
    const openNotification = () =>{
        dispatch( setIsNotification(true));
        dispatch( resetNotificationCount());

    }

    const openCreateNewGroup = () =>{
        dispatch( setIsNewGroup(true));
    }

    //delete chat and leave group( three dots for more options)
    const handleDeleteChatOrLeaveGroup = ( e)=>{
        setAnchorEl(e.currentTarget);
        dispatch( setIsContextMenuDeleteChatDialog(true));

    };
   

    //if not logged in redirect to login page
    useEffect(()=>{
    if(!isLogin){
        navigate("/login");
    }

    },[isLogin]);
   

    useEffect(()=>{
        if(success){
            // toast.success("User Logout Successfully");
            dispatch( clearSuccess());
        }
        if(error){
            // toast.error(error);
            dispatch( clearError());
        }
    }, [success,error]);


  return (
    <>
        <div style={{backgroundColor:"rgb(250, 125, 103)",height:"10vh",position:"static", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
    
            <div className="leftHeader">
                {/* title in laptop but menu for phones */}
                <Typography 
                    sx={{
                        display:{ xs:"none", sm:"block"}, 
                        color:"white", 
                        marginLeft:"1vw",
                        fontWeight:"500",
                        textShadow:"3px 3px 10px gray",
                    }}
                > 
                 CHIT-CHAT
                </Typography>
        
                <IconButton 
                    onClick={handleMenu}
                    sx={{
                        display:{ xs:"block", sm:"none"}, 
                        color:"white", 
                        marginLeft:"1vw"
                    }}
                >
                    <MenuIcon/>

                </IconButton>
            </div>
    
            <div className="rightHeader">
                <Tooltip sx={{ display:{md:"none"},}} title={"Profile"} placement="bottom">  
                    <IconButton sx={{ display:{ md:"none"},}} onClick={()=>{ navigate("/profile")}}>
                        <ProfileIcon sx={{ display:{xs:"inline-flex",md:"none"},color:"rgb(243, 243, 243)",}}/>
                    </IconButton> 
                </Tooltip>

                <IconBtn Title={"Search"} icon={<SearchIcon/>}  onClick={openSearch}/>
                <IconBtn Title={"New Group"} icon={<AddIcon/>} onClick={  openCreateNewGroup}/>
                <IconBtn Title={"Manage Groups"} icon={<GroupsIcon/>} onClick={ handleManageGroups}/>
                <IconBtn Title={"Notifications"} icon={<NotificationsIcon/>} onClick={openNotification} count={ notificationCount} />
                
                <IconBtn Title={"Logout"} icon={<LogoutIcon/>} onClick={()=>{dispatch(setIsUserLogoutConfirmation(true))}}/>
                <UserLogoutConfirmation handler={handleLogout} loading={isLoading}/>
                
                
                {/* menu for delete or leave chat , and show only if chatId is their*/}
                {
                    params.chatId &&  (
                        <>
                        <Tooltip title={"More Options"} placement="bottom">  
                           <IconButton onClick={ handleDeleteChatOrLeaveGroup}>
                              <MoreOption sx={{ color:"rgb(243, 243, 243)"}}/>
                            </IconButton> 
                        </Tooltip>
                        <DeleteChatMenu anchorEl={anchorEl}  />
                        </>  
                    )  
                }
                          
            
            </div>
        </div>

        {
            isSearch && (
                <Suspense fallback={<Backdrop open={true}/>}>
                    <SearchDialog/>
                </Suspense>
            )
        }
        {
            isNotification && (
                <Suspense fallback={<Backdrop open={true}/>}>
                    <Notifications/>
                </Suspense>
            )
        }
        {
            isNewGroup && (
                <Suspense fallback={<Backdrop open={true}/>}>
                    <NewGroup/>
                </Suspense>
            )
        }
    </>
  )    
}

const IconBtn = ( { Title, icon, onClick, count=0 }) =>{
    return(
        <Tooltip title={Title} placement="bottom">
            <IconButton onClick={onClick} sx={{color:"rgb(243, 243, 243)", marginRight:"0.5vw"}}>
                <Badge badgeContent={count} max={99} color="primary" >
                    {icon}
                </Badge>
            </IconButton>
            
        </Tooltip>
    )
}

export default Header
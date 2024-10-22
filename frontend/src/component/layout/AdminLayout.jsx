import { useState} from "react";
import Grid from "@mui/material/Grid2"; 
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Drawer, Typography, Box, IconButton } from "@mui/material";
//MUI Icons--
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupsIcon from "@mui/icons-material/Groups";
import MessageIcon from "@mui/icons-material/Message";
import LogoutIcon from "@mui/icons-material/Logout";
//--

export default function AdminLayout( { children}){

    const location = useLocation();
    const navigate = useNavigate();
    const isAdmin = true;

    const handleLogout = ()=>{
        console.log("logout");
    }

    const adminTabs = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: <DashboardIcon/>
        },
        {
            name: "Users",
            path: "/admin/users-management",
            icon: <ManageAccountsIcon/>
        },
        {
            name: "Chats",
            path: "/admin/chats-management",
            icon: <GroupsIcon/>
        },
        {
            name: "Messages",
            path: "/admin/messages",
            icon: <MessageIcon/>
        },
    ]

    const Sidebar = ( { style={}}) =>{
    
        return(
            <>
            <Typography variant="h5" textTransform={"uppercase"} sx={{margin:"1rem 1rem 2rem 1rem"}}>Chit-Chat</Typography>
            
            <Box style={style} sx={{ margin:"1rem 1rem 1rem 2rem"}}>
                {
                    adminTabs.map( ( tab)=>{
                        return(
                            <Link key={tab.path} to={tab.path} style={{textDecoration:"none", color:"black"}}>
                              <Box 
                                  sx={{display:"flex", alignItems:"center", justifyContent:"start",padding:"1rem 0 1rem 1rem",borderRadius:"5px",
                                        "&:hover": {backgroundColor: "rgba(0, 0, 0, 0.212)"}, 
                                        backgroundColor: location.pathname===tab.path ? "black" : "white",
                                        color: location.pathname===tab.path ? "white" : "black"
                                    }}
                              >
                                    {tab.icon}
                                    <Typography sx={{ fontWeight:"500", marginLeft:"10px"}}>{tab.name}</Typography>
                              </Box>
                            </Link>
                        )
                    })
                }
                <Box onClick={handleLogout}
                    sx={{display:"flex", alignItems:"center", justifyContent:"start",padding:"1rem 0 1rem 1rem",borderRadius:"5px",
                        "&:hover": {backgroundColor: "rgba(0, 0, 0, 0.212)"}, 
                    }}
                >
                    <LogoutIcon/>
                    <Typography sx={{ fontWeight:"500", marginLeft:"10px"}}>Logout</Typography>
                </Box>
            </Box>
            </>
        )
    }

    const [ isMobile, setIsMobile] = useState(false);
    const handleSidebarClose = ()=>{
        setIsMobile(false);
    }

    if(!isAdmin){
        navigate("/admin");
    }

    return(
        <Grid container sx={{ height:"100vh"}}>

            {/* Sidebar */}
            <Grid size={{ xs:0, sm:4, md:3 }} sx={{display:{xs:"none", sm:"block"}}}>
                <Sidebar/>
            </Grid>

            {/* children:- dashboard, user, chat, message Management */}
            <Grid size={{ xs:12, sm:8, md:9 }} sx={{backgroundColor:"rgba(128, 128, 128, 0.24)"}}>
                {children}
            </Grid>


            {/* icon to open sidebar(drawer) for mobiles */}
            <Box 
                sx={{
                    display:{ xs:"block", sm:"none"},
                    position:"fixed", 
                    right:"25px", 
                    top:"20px",
                }}
            >
                <IconButton onClick={()=>{ setIsMobile(!isMobile)}}>
                    { isMobile ? <CloseIcon/> :  <MenuIcon/>}
                </IconButton>
            </Box>

            {/* Drawer for mobiles */}
            <Drawer open={isMobile} onClose={handleSidebarClose} sx={{display:{xs:"block", sm:"none"}}}>
                <Sidebar style={{width:"50vw",}}/>
            </Drawer>

        </Grid>
    )
}

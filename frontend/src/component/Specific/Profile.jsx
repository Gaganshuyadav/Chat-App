import { Avatar, Typography, Box } from '@mui/material'
import React from 'react'
import { AccountBox, CalendarMonth, Tag, AdminPanelSettings} from "@mui/icons-material";
import moment from "moment";
import { useSelector, useDispatch} from "react-redux";

const Profile = () => {

  const dispatch = useDispatch();
  const { user} = useSelector( state=>state.user);



  return (
    <div className="profile" style={{width:"100%", display:"flex",flexDirection:"column", alignItems:"center",backgroundColor:"rgb(37, 37, 37)",height:"100%"}}>
        <Avatar 
            src={ user ? user.avatar.url : "https://th.bing.com/th/id/R.e29103faad6c8164a3940007306876c3?rik=5hnZ6oFoGOn7eQ&riu=http%3a%2f%2fimages.unsplash.com%2fphoto-1566264956500-0549ed17e161%3fixlib%3drb-1.2.1%26q%3d80%26fm%3djpg%26crop%3dentropy%26cs%3dtinysrgb%26w%3d1080%26fit%3dmax%26ixid%3deyJhcHBfaWQiOjEyMDd9&ehk=Eq%2f3gtVGbPQAVHyWOxG%2b3tGILLT1DLgCih2a8FfZM74%3d&risl=&pid=ImgRaw&r=0" }
            sx={{ width:{xs:"45vw", sm:"35vw", md:"15vw"} ,height:{xs:"45vw", sm:"35vw", md:"15vw"} ,border:"4px solid rgb(190, 125, 103)", marginTop:"5vh"}}
            />
        <ProfileCard heading={"Bio"} text={ user?.bio } icon={<Tag style={{fontSize:"17px"}}/>}/>
        <ProfileCard heading={"Name"} text={ user?.name}  icon={<AccountBox style={{fontSize:"17px"}}/>} />
        <ProfileCard heading={"Username"} text={ user?.username} icon={<AdminPanelSettings style={{fontSize:"17px"}}/>} />
        <ProfileCard heading={"Joined"} text={moment( user?.createdAt).fromNow()}  icon={<CalendarMonth style={{fontSize:"17px"}}/>} />
        {/* only for mobiles */}
        <Box size={{ xs:1, sm:2, md:0 }} sx={{ height:"450px"}}></Box>
    </div>
  )
}

const ProfileCard = ({ heading, text, icon}) =>{
    return(
        <div style={{display:"flex", flexDirection:"column",textAlign:"center", marginTop:"4vh"}}>
            <Typography sx={{color:"white" ,fontSize:{xs:"2vmax",sm:"1.7vmax",md:"1.2vmax"}, padding:"0 5px"}}>
                {text}
            </Typography>
            <div style={{ display:"flex",display:"flex",textAlign:"center",justifyContent:"center"}}>
              <Typography sx={{color:"rgb(177, 173, 173)",lineHeight:"0"}}>
                {icon}
              </Typography>
              <Typography sx={{color:"rgb(177, 173, 173)",fontSize:"13px",marginBottom:{xs:"15px",sm:"0px"}, }}>
                {heading}
              </Typography>
            </div>
        </div>
    )
}

export default Profile
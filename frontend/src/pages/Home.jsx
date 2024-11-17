import React from 'react';
import AppLayout from '../component/layout/AppLayout';
import { Typography } from '@mui/material';
import HomeLogo from "/images/chit-chat-high-resolution-logo-transparent.png";

const Home = () => {
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
      <img src={HomeLogo} style={{width:"60%" , margin:"40px 0 0 0"}}/> 
      <Typography sx={{textAlign:"center", fontSize:"33px", color:"rgb(250, 125, 103)", marginTop:"200px"}}>Choose Your Chat </Typography>
    </div>
  )
}

export default AppLayout()(Home);
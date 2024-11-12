import React from 'react';
import AppLayout from '../component/layout/AppLayout';
import { Typography } from '@mui/material';

const Home = () => {
  return (
    <div > 
      <Typography sx={{textAlign:"center", fontSize:"2rem"}}>Select a friend to Chat</Typography>
    </div>
  )
}

export default AppLayout()(Home);
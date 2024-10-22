import React from 'react';
import Grid from "@mui/material/Grid2";
import { Skeleton } from '@mui/material';

const SkeletonLoader = () => {
    return (
        <>
        <div style={{backgroundColor:"white", width:"100vw", height:"100vh"}}>
            <div style={{height:"10vh"}}>
                <Skeleton sx={{backgroundColor:"rgb(204, 201, 201)",height:"6vh",marginTop:"2vh" }} variant="rectangular" />
            </div>
        
            <Grid style={{height:"90vh" }}  container>
                <Grid 
                    size={{ xs:0,sm:4,md:4, lg:3 }} 
                    sx={{display:{xs:"none", sm:"block"}}}
                >
                    {
                        Array.from({length: 5}).map((_,idx)=>{
                            return(
                                <div key={idx} style={{display:"flex", justifyContent:"space-around", alignItems:"center", margin:"5vh 0"}}>
                                    <Skeleton key={`${idx}-1`} sx={{backgroundColor:"rgb(204, 201, 201)",width:"10vh", height:"10vh"}} variant="circular" />
                                    <Skeleton key={`${idx}-2`} sx={{backgroundColor:"rgb(204, 201, 201)", width:"12vw", height:"7vh"}} variant="rounded" />
                                </div>
                            )
                        })
                    }
                    
                </Grid>

                <Grid  
                    size={{ xs:12, sm:8 ,md:4 , lg:6 }} 
                >
                     {
                        Array.from({length: 5}).map((_,idx)=>{
                            return(
                                <div key={idx} style={{display:"flex", justifyContent:"space-around", alignItems:"center", margin:"1vh 0"}}>
                                    <Skeleton  sx={{backgroundColor:"rgb(204, 201, 201)", width:"90%", height:"10vh", marginBottom:"4vh"}} variant="rounded" />
                                </div>
                            )
                        })
                    }
                </Grid>

                <Grid  
                    size={{ xs:0,sm:0,md:4, lg:3 }}
                    sx={{ display:{xs:"none",sm:"none", md:"block"}}}
                >
                <Skeleton  sx={{backgroundColor:"rgb(204, 201, 201)", width:"100%", height:"100%"}} variant="rectangular"/>
                </Grid>

            </Grid>
        </div>
        </>
    )
}

export default SkeletonLoader;
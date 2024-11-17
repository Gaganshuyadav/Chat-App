import { Skeleton, Box } from "@mui/material";


export default function DashboardSkeletonLoader(){

    return(
        <div style={{backgroundColor:"rgb(249, 249, 249)", width:"100%", height:"100%"}}>
            <Box style={{width:"100%", height:"100%",padding:"50px 0 0 0"}}>
            <Skeleton variant="rectangular" sx={{width:"95%", height:"15%", margin:"0px auto", borderRadius:"5px"}} />
            <div style={{height:"75%", width:"95%", margin:"0px auto",display:"flex", justifyContent:"space-between", alignItems:"end"}}>
                <Skeleton variant="rectangular" sx={{width:"55%", height:"93%", borderRadius:"10px"}}/>
                <Skeleton variant="rectangular" sx={{width:"40%", height:"85%", borderRadius:"10px"}}/>
            </div>
            </Box>
        </div>
    )
}


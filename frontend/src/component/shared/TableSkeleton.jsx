import { Skeleton, Box } from "@mui/material";


export default function TableSkeleton(){

    return(
        <div style={{backgroundColor:"rgb(249, 249, 249)", width:"100%", height:"100%"}}>
            <Box style={{width:"100%", height:"80%",padding:"50px 0 0 0"}}>
            <Skeleton variant="rectangular" sx={{width:"80%", height:"15%", margin:"0px auto", borderRadius:"5px"}} />
    
            {
               Array.from({length: 6}).map(( _, idx)=>{
                return <Skeleton key={idx} variant="rectangular" sx={{width:"80%", height:"7%", margin:"25px auto", borderRadius:"3px"}} />
               })
            }
            </Box>
        </div>
    )
}


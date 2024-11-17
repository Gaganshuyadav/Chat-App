import { Paper, Typography, Box, Stack } from "@mui/material";
import AdminLayout from "../../component/layout/AdminLayout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Input, ButtonS} from "../../component/styles/StyledComponents";
import moment from "moment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import { LineChart, DoughnutChart} from "../../component/Specific/Charts";
import  { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminAllDashboardInfo } from "../../redux/features/thunks/admin";
import DashboardSkeletonLoader from "../../component/layout/DashboardSkeletonLoader";

export default function Dashboard(){

  const dispatch = useDispatch();
  const { allStats, dashboardIsLoading} = useSelector(state=>state.admin);
    
    useEffect(()=>{

      dispatch( adminAllDashboardInfo());
    },[]);



    return(
        <>
          <AdminLayout>
            {
              dashboardIsLoading
              ?
              <DashboardSkeletonLoader/>
              :
              (<div >

              {/* (1).Appbar */}
              { Appbar}

              {/* (2).Charts */}
              <Stack  
                  justifyContent={"space-between"} 
                  flexDirection={{xs:"column",lg:"row"}} 
                  sx={{margin:{xs:"2rem 0.8rem 1rem 0.8rem",sm:"2rem 1rem 1rem 1rem"}}}>

                {/* Line Chart*/}
                <Paper elevation={4} sx={{ width:{md:"100%", lg:"55%"}, borderRadius:"10px"}} >
                  <Typography sx={{fontSize:"18px", fontWeight:"500", margin:"1rem"}}>Last Messages</Typography>
                    <Box sx={{ margin:{ xs:"10px 0 10px 10px",md:"20px 0px 20px 20px "}}}>
                      <LineChart dataArray={allStats?.chartMessages}/>
                    </Box>
                </Paper>

                {/* Doughnut Chart */}
                <Paper sx={{ width:{ xs:"90%", lg:"41%"}, borderRadius:"10px", margin:{xs:"2rem auto",lg:"2rem 0 0 0"}, marginBottom:{xs:"0px"}}}>
                  <Box sx={{position:"relative",display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <DoughnutChart 
                        value={ allStats && [ allStats.DirectChats, allStats.GroupChats]}
                        labels={[ "Single Chats", "Group Chats"]} 
                    />
                    <Stack flexDirection={"row"} sx={{position:"absolute"}}>
                      <PersonIcon/>
                      <Typography margin={"0px 4px"} sx={{fontWeight:"500"}} >Vs</Typography>
                      <GroupIcon/>
                    </Stack>
                  </Box>
                </Paper>

              </Stack>

              {/* (3).Widgets */}
              <Widgets Stats={ allStats && allStats}/>

            </div>)
          }
          </AdminLayout>
        </>
    )
}

//Appbar
const Appbar = (
  <div> 
      <Paper elevation={4} sx={{ borderRadius:"10px", margin:{ xs:"3.3rem 0.8rem 0rem 0.8rem", sm:"2rem 1rem 1rem 1rem"}, padding:"0.6rem", position:"relative"}} >
        <Box sx={{ padding:{xs:"1rem 0 1rem 0",md:"1rem"}, display:"flex", justifyContent:"start", alignItems:"center"}}>
          <AdminPanelSettingsIcon sx={{fontSize:"40px",marginLeft:{ xs:"0vw", md:"2vw"} }}/>
          <Input placeholder="Search..." />
          <ButtonS>Search</ButtonS >
          <Box flexGrow={1}>
            <Typography 
                sx={{ display:{xs:"none", md:"block"}, marginLeft:"2vw",alignSelf:"flex-end", placeSelf:"flex-end", fontWeight:"400", color:"gray"}}
            >
              {moment().format("dddd, MMMM Do YYYY")}
            </Typography>
          </Box>
          <NotificationsIcon sx={{ fontSize:"25px", color:"black", margin:"auto 1px", marginLeft:"2vw"}}/>
        </Box>
      </Paper>
  </div>
)

    
//Widget
const Widget = ( { Title, Value, Icon}) =>{
  return(
    <Paper sx={{width:{ xs:"80%", sm:"70%", md:"60%",lg:"28%"}, marginBottom:"2rem",padding:"2rem", borderRadius:"20px"}}>
      <Stack sx={{  flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <Typography sx={{border:"4px solid black", width:"70px", height:"70px", textAlign:"center", placeContent:"center", borderRadius:"50%", fontWeight:"600",fontSize:"1.1rem"}}>{ Value}</Typography> 
        <Stack flexDirection={"row"} sx={{ color:"black",marginTop:"0.5rem"}}>
            { Icon}
            <Typography margin={"0 0 0 0.4rem"} sx={{fontWeight:"500"}}>{ Title}</Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}


//Widgets
const Widgets =( { Stats=0})=>{

  return(
      <Stack 
          sx={{
            flexDirection:{xs:"column",lg:"row"}, 
            margin:{xs:"2rem 0.8rem 1rem 0.8rem",sm:"2rem 1rem 1rem 1rem"},
            justifyContent:"space-between",
            alignItems:"center",
          }}
      >
        <Widget Title={ "Users"} Value={ Stats?.users} Icon={<PersonIcon/>} />
        <Widget Title={ "Chats"} Value={ Stats?.chats} Icon={<GroupIcon/>} />
        <Widget Title={ "Messages"} Value={ Stats?.messages} Icon={<MessageIcon/>} />
      </Stack>
      )
}



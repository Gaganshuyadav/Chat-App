import { useEffect} from "react";
import AdminLayout from "../../component/layout/AdminLayout";
import Table from "../../component/shared/Table";
import { Box, Avatar, AvatarGroup, Typography} from "@mui/material";
import { useSelector, useDispatch} from "react-redux";
import { adminAllChats } from "../../redux/features/thunks/admin";
import TableSkeleton from "../../component/shared/TableSkeleton";

export default function ChatManagement(){

  const dispatch = useDispatch();
  const { dashboardIsLoading, allChats} = useSelector(state=>state.admin);

    const columns = [
      { field: "id", headerName: "ID", headerClassName:"table-header",  width:250 },
      { field: "avatar", headerName: "Avatar", headerClassName:"table-header", width:170, renderCell: ( params)=>{
          return(
            <Box sx={{height:"100%", display:"flex", alignItems:"center"}}>
              <AvatarGroup>
                  <Avatar src={params.row.avatar[0]} sx={{width:"43px" ,height:"43px"}}/>
                  <Avatar src={params.row.avatar[1]} sx={{width:"43px" ,height:"43px"}}/>
                  <Avatar src={params.row.avatar[2]} sx={{width:"43px" ,height:"43px"}}/>
              </AvatarGroup>
            </Box>
          )
      } },
      { field: "name", headerName: "Name", headerClassName:"table-header" ,width: 150 },
      { field: "groupChat", headerName: "Group", headerClassName:"table-header" ,width: 80,  },
      { field: "totalMembers", headerName: "Total Members", headerClassName:"table-header" ,width: 150,  },
      { field: "members", headerName: "Members", headerClassName:"table-header" , width: 250, renderCell: ( params)=>{
        return(
            <Box sx={{height:"100%", display:"flex", alignItems:"center"}}>
              <AvatarGroup>
                {
                  params.row.members.map( ( member)=>{
                    return(
                      <Avatar key={member._id} src={member.avatar} alt={member.name}  sx={{width:"43px" ,height:"43px"}}/>
                    )
                  })
                }
              </AvatarGroup>
            </Box>
            )
      }},
      { field: "totalMessages", headerName: "Total Messages", headerClassName:"table-header" , width: 120,   } ,
      { field: "creator", headerName: "Created By", headerClassName:"table-header" , width: 250, renderCell: (params)=>{
        return(
          <Box sx={{display:"flex", alignItems:"center"}}>
            <Avatar src={params.row.creator.avatar} alt={params.row.creator.name}  sx={{width:"43px" ,height:"43px"}}/>
            <Typography sx={{ margin:"0px 0px 0px 15px"}} >sdfsdfdsfds</Typography>
          </Box>
        )
      } } ,
    ]
    
  const rows = allChats && allChats.map( ( chat)=>{
                      return { id: chat._id, 
                               avatar: chat.avatar, 
                               name: chat.name, 
                               groupChat: chat.groupChat, 
                               totalMembers: chat.totalMembers, 
                               members: chat.members, 
                               totalMessages: chat.totalMessages, 
                               creator: chat.creator,
                            };
                  })

    useEffect(()=>{

      dispatch( adminAllChats());
    },[]);
      

    return(
        <AdminLayout>
        {
          dashboardIsLoading
          ?
          <TableSkeleton/>
          :
          <Table heading={"ALL Chats"} rows={rows} columns={columns} />
        }
        </AdminLayout>
    )
}
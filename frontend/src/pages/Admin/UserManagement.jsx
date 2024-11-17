import { useEffect} from "react";
import AdminLayout from "../../component/layout/AdminLayout";
import Table from "../../component/shared/Table";
import { Box, Avatar} from "@mui/material";
import TableSkeleton from "../../component/shared/TableSkeleton";
import { useSelector,useDispatch } from "react-redux";
import { adminAllUsers } from "../../redux/features/thunks/admin";

export default function UserManagement(){

  const dispatch = useDispatch();
  const { allUsers, dashboradIsLoading} = useSelector(state=>state.admin);

  const columns = [
    { field: "id", headerName: "ID", headerClassName:"table-header",  width:250 },
    { field: "avatar", headerName: "Avatar", headerClassName:"table-header", renderCell: ( params)=>{
        return(
          <Box sx={{height:"100%", display:"flex", alignItems:"center"}}>
            <Avatar src={params.row.avatar} sx={{width:"43px" ,height:"43px"}}/>
          </Box>
        )
    } },
    { field: "name", headerName: "Name", headerClassName:"table-header" ,width: 150,  },
    { field: "username", headerName: "Username", headerClassName:"table-header" , width: 150, },
    { field: "friends", headerName: "Friends", headerClassName:"table-header" , width: 100,   } ,
    { field: "groups", headerName: "Groups", headerClassName:"table-header" , width: 100,  } ,
  ]
    
  const rows = allUsers && allUsers.map( ( user)=>{
                      return { id: user._id, avatar: user.avatar, name: user.name, username: user.username, friends: user.friends, groups: user.groups};
                  })


      
    useEffect(()=>{
       dispatch( adminAllUsers());
    },[]);

    return(
        <>
          <AdminLayout>
              {
                dashboradIsLoading
                ?
                <TableSkeleton/>
                :
                <Table heading={"ALL USERS"} rows={rows} columns={columns} />
              }
              
          </AdminLayout>
        </>
    )
}
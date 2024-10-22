import { useEffect} from "react";
import AdminLayout from "../../component/layout/AdminLayout";
import Table from "../../component/shared/Table";
import { Box, Avatar} from "@mui/material";

export default function UserManagement(){


  const userSampleData = [ 
    { _id: "hfhghghghghghghghghg45541",name:"gaganshu yadav", username: "gaganshu yadav",avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D", friends: 43, groups: 65},
    { _id: "hfhghghghghghghghghg45542",name:"gaganshu yadav", username: "gaganshu yadav",avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D", friends: 43, groups: 65},
    { _id: "hfhghghghghghghghghg45543",name:"gaganshu yadav", username: "gaganshu yadav",avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D", friends: 43, groups: 65},
    { _id: "hfhghghghghghghghghg45544",name:"gaganshu yadav", username: "gaganshu yadav",avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D", friends: 43, groups: 65},
    { _id: "hfhghghghghghghghghg45545",name:"gaganshu yadav", username: "gaganshu yadav",avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D", friends: 43, groups: 65},
    ]

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
    
  const rows = userSampleData && userSampleData.map( ( user)=>{
                      return { id: user._id, avatar: user.avatar, name: user.name, username: user.username, friends: user.friends, groups: user.groups};
                  })
      
    useEffect(()=>{
       
    },[]);

    return(
        <>
          <AdminLayout>
              <Table heading={"ALL USERS"} rows={rows} columns={columns} />
          </AdminLayout>
        </>
    )
}
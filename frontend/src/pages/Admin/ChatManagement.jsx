import { useEffect} from "react";
import AdminLayout from "../../component/layout/AdminLayout";
import Table from "../../component/shared/Table";
import { Box, Avatar, AvatarGroup, Typography} from "@mui/material";

export default function ChatManagement(){


  const chatSampleData = [ 
    {
      _id: "hfhghghghghghghghghg455411",
      name: "group ha hamara",
      groupChat: false,
      avatar: ["https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D","https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D","https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"],
      members: [
        {_id: "hfhghghgshghgh7ghghghg45541", name: "gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"},
        {_id: "hfhghghgha4ghghghghghg45541", name: "gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"},
        {_id: "hfhghgh8ghgwhghghghghg45541", name: "gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"}
    ],
      creator:{
          name: "gaganshu yadav",
          avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D",
      },
      totalMembers: 56,
      totalMessages: 67,
  },
  {
    _id: "hfhghghghghghghghghg4554144",
    name: "group ha hamara",
    groupChat: true,
    avatar: ["https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D","https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D","https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"],
    members: [
      {_id: "hfhghaghghghgh7ghghghg45541", name: "gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"},
      {_id: "hfhgshghgh4ghghghghghg45541", name: "gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"},
      {_id: "hfhghgh8ghgfhghghghghg45541", name: "gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"}
  ],
    creator:{
        name: "gaganshu yadav",
        avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    totalMembers: 56,
    totalMessages: 67,
},
{
  _id: "hfhghghghghghghghg5hg45541",
  name: "group ha hamara",
  groupChat: false,
  avatar: ["https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D","https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D","https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"],
  members: [
    {_id: "hfhghghghghgh7ghghgshg45541", name: "gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"},
    {_id: "hfhghghgh4ghghghgshghg45541", name: "gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"},
    {_id: "hfhghgh8ghghghghwghghg45541", name: "gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"}
],
  creator:{
      name: "gaganshu yadav",
      avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  totalMembers: 56,
  totalMessages: 67,
},
{
  _id: "hfhghghghghghghghg0hg45541",
  name: "group ha hamara",
  groupChat: true,
  avatar: ["https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D","https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D","https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"],
  members: [
          {_id: "hfhghghghghgh7ghghghg45541", name: "gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"},
          {_id: "hfhghghgh4ghghghghghg45541", name: "gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"},
          {_id: "hfhghgh8ghghghghghghg45541", name: "gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"},
          {_id: "hfhghghghghgh7ghghghg45541", name: "gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"},
          {_id: "hfhghghgh4ghghghghghg45541", name: "gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"},
          {_id: "hfhghgh8ghghghghghghg45541", name: "gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"}
      ],
  creator:{
      name: "gaganshu yadav",
      avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  totalMembers: 56,
  totalMessages: 67,
}
  ];

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
        console.log(params);
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
    
  const rows = chatSampleData && chatSampleData.map( ( chat)=>{
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
       
    }, []);

    return(
        <>
          <AdminLayout>
              <Table heading={"ALL Chats"} rows={rows} columns={columns} />
          </AdminLayout>
        </>
    )
}
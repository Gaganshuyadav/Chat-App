import { useEffect} from "react";
import AdminLayout from "../../component/layout/AdminLayout";
import Table from "../../component/shared/Table";
import { Box, Avatar, Typography} from "@mui/material";
import { fileFormat} from "../../lib/features.jsx"; 
import { RenderAttachment} from "../../component/shared/RenderAttachment.jsx";
import "../../component/styles/shared.css";

export default function MessageManagement(){

  const messageSampleData = [ 
    { _id: "hfhghghghghghghghghg45542", 
      attachments: [], 
      content:"i am ironman, \nlove you 3000, i am ironman, \nlove you 3000, i am ironman, \nlove you 3000, i am ironman, \nlove you 3000, i am ironman, love you \n3000i am ironman, love you 3000i am ironman,love you 3000i am ironman, love you 3000", 
      sender: { _id: "hfhghghghghghghghghg45542", name:"gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"}, 
      chatId: "hfhghghghghghghghghg45542", 
      groupChat: true, 
      time: "october 16th 2023, wednesday"
    },
    { _id: "hfhghghghghghghghghg45541", 
      attachments: ["https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"], 
      content:"i am ironman, love you 3000", 
      sender: { _id: "hfhghghghghghghghghg45541", name:"gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"}, 
      chatId: "hfhghghghghghghghghg45541", 
      groupChat: false, 
      time: "october 16th 2023, wednesday"
    },
    { _id: "hfhghghghghghghghghg45543", 
      attachments: [], 
      content:"i am ironman, love you 3000", 
      sender: { _id: "hfhghghghghghghghghg45543", name:"gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"}, 
      chatId: "hfhghghghghghghghghg45543", 
      groupChat: true, 
      time: "october 16th 2023, wednesday"
    },
    { _id: "hfhghghghghghghghghg45544", 
      attachments:  [ "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"], 
        content:"i am ironman, love you 3000", 
        sender: { _id: "hfhghghghghghghghghg45544", name:"gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"},
        chatId: "hfhghghghghghghghghg45544", 
        groupChat: true, 
        time: "october 16th 2023, wednesday"
    },

    { _id: "hfhghghghghghghghghg45545", 
      attachments: [], 
      content:"i am ironman, love you 3000",
       sender: { _id: "hfhghghghghghghghghg45545", name:"gaganshu yadav", avatar: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D"}, chatId: "hfhghghghghghghghghg45545", groupChat: false, time: "october 16th 2023, wednesday"},
    ]

    const columns = [
      { field: "id", headerName: "ID", headerClassName:"table-header", cellClassName:"single-cell",  width:250 },
      { field: "attachments", headerName: "Attachments", headerClassName:"table-header", cellClassName:"single-cell", width:250, height:250, renderCell: ( params)=>{
          return(
            <Box sx={{height:"100%", display:"flex", alignItems:"center"}}>
              {
                params.row.attachments && params.row.attachments.length>0 ? params.row.attachments.map(( attachment, i)=>{
                  const url = attachment;
                  console.log(url);
                  const file = fileFormat(url);
                  return(
                    <Box sx={{border:"none"}}>
                      <a href={url} target="_blank">
                        { RenderAttachment(file,url)}
                      </a>
                    </Box>
                  )
                })
                :
                "No Attachments"
              }
            </Box>
          )
      } },
      { field: "content", headerName: "Content", headerClassName:"table-header", cellClassName:"single-cell", width: 250,  renderCell: (params)=>{
        return (
          <Box className="content-handle" sx={{  marginTop:"18px", overflow:"hidden", width:"230px", boxShadow:"1px 1px 27px -10px gray", borderRadius:"10px", height:"100px", display:"flex", flexDirection:"row", alignItems:"center","&:hover":{ overflow:"auto", transition:"300ms"}}}>
            <p style={{width:"100px"}}>{params.row.content}</p>
          </Box>
        )
      }},
      { field: "sender", headerName: "Sent By", headerClassName:"table-header", cellClassName:"single-cell", width: 220, display:"flex", renderCell: ( params)=>{
        return(
          <Box sx={{display:"flex", alignItems:"center"}}>
            <Avatar src={params.row.sender.avatar}/>
            <Typography sx={{marginLeft:"10px"}}>{ params.row.sender.name}</Typography>
          </Box>
        )
      }},
      { field: "chatId", headerName: "Chat", headerClassName:"table-header", cellClassName:"single-cell", width: 250 } ,
      { field: "groupChat", headerName: "Group Chat", headerClassName:"table-header", cellClassName:"single-cell", width: 100} ,
      { field: "time", headerName: "Time", headerClassName:"table-header" , cellClassName:"single-cell", width: 250}
    ];
    
  const rows = messageSampleData && messageSampleData.map( ( message)=>{
                      return { 
                        id: message._id, 
                        attachments: message.attachments, 
                        content: message.content, 
                        sender: message.sender, 
                        chatId: message.chatId, 
                        groupChat: message.groupChat,
                        time: message.time
                      };
                  })
      
    useEffect(()=>{
       
    },[]);

    return(
        <>
          <AdminLayout>
              <Table heading={"ALL MESSAGES"} rows={rows} columns={columns} heightByMsg={true} />
          </AdminLayout>
        </>
    )
};
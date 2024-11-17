import { useEffect} from "react";
import AdminLayout from "../../component/layout/AdminLayout";
import Table from "../../component/shared/Table";
import { Box, Avatar, Typography} from "@mui/material";
import { fileFormat} from "../../lib/features.jsx"; 
import { RenderAttachment} from "../../component/shared/RenderAttachment.jsx";
import "../../component/styles/shared.css";
import { useDispatch, useSelector} from "react-redux";
import TableSkeleton from "../../component/shared/TableSkeleton.jsx";
import { adminAllMessages } from "../../redux/features/thunks/admin.jsx";


export default function MessageManagement(){


  const dispatch = useDispatch();
  const { dashboardIsLoading, allMessages} = useSelector(state=>state.admin); 

    const columns = [
      { field: "id", headerName: "ID", headerClassName:"table-header", cellClassName:"single-cell",  width:250 },
      { field: "attachments", headerName: "Attachments", headerClassName:"table-header", cellClassName:"single-cell", width:250, height:250, renderCell: ( params)=>{
          return(
            <Box sx={{height:"100%", display:"flex", alignItems:"center"}}>
              {
                params.row.attachments && params.row.attachments.length>0 ? params.row.attachments.map(( attachment, i)=>{
                  const url = attachment.url;
                  console.log(url);
                  const file = fileFormat(url);
                  return(
                    <Box sx={{border:"none", height:"100%", width:"100%",display:"flex", justifyContent:"center", alignItems:"start"}}>
                      <a href={url} target="_blank">
                        { RenderAttachment(file,url, "200px","140px" )}
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
    
  const rows = allMessages && allMessages.map( ( message)=>{
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
       
      dispatch( adminAllMessages());
    },[]);


    return(
        <>
          <AdminLayout>
            {
              dashboardIsLoading
              ?
              <TableSkeleton/>
              :
              <Table heading={"ALL MESSAGES"} rows={rows} columns={columns} heightByMsg={true} />
            }
              
          </AdminLayout>
        </>
    )
};
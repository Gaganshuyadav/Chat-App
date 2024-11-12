import { useState} from 'react';
import { Typography, Box, Checkbox, Snackbar } from '@mui/material';
import moment from "moment";
import { fileFormat } from '../../lib/features';
import { RenderAttachment} from "../shared/RenderAttachment";
import { useSelector, useDispatch} from "react-redux";
import { setIsSelectedMessages } from '../../redux/features/Slices/componentSlice.jsx';
import { setSelectedMessagesForDelete, setSelectDeleteMessagesCountIncrement, setSelectDeleteMessagesCountDecrement, setSelectDeleteMessagesCountZero } from "../../redux/features/Slices/messageSlice.jsx";

const MessageComponent = ( { message, user}) => {

    //take attributes from message
    const { _id, content, sender, createdAt, attachments=[]} = message;

    const { selectedMessagesForDelete , selectDeleteMessagesCountIncrement, selectDeleteMessagesCountDecrement, selectDeleteMessagesCountZero} = useSelector(state=>state.message);
    const { isSelectedMessages} = useSelector( state=>state.component);
    const dispatch = useDispatch();

    
    //events
    const handleSelectCheckClick=()=>{

      if( isSelectedMessages){
          //toggle ids
          if(selectedMessagesForDelete.includes(_id)){
              dispatch( setSelectedMessagesForDelete( selectedMessagesForDelete.filter( (messageID)=>{ return messageID!==_id})));
              dispatch( setSelectDeleteMessagesCountDecrement());
          }
          else{
              dispatch( setSelectedMessagesForDelete( [ ...selectedMessagesForDelete, _id]));
              dispatch( setSelectDeleteMessagesCountIncrement());
          }
      }
    
    }


  return (
     
  <Box 
    onClick={ handleSelectCheckClick} 
    sx={{
        display:"flex", 
        flexDirection:"row" , 
        backgroundColor:  isSelectedMessages && selectedMessagesForDelete.includes(_id) &&  (sender?._id===user?._id ? "rgb(234, 198, 188)" : "rgb(187, 200, 187)") ,
        "&:hover":{ backgroundColor:  isSelectedMessages && ( sender?._id===user?._id ? "rgb(234, 198, 188)" : "rgb(187, 200, 187)") }

    }}

  >
    


    {/* toggle select messages */}
    {
        isSelectedMessages && (
            <div>
              <Checkbox 
                 checked={ selectedMessagesForDelete.includes(_id)}
                 sx={{ 
                      color:sender?._id===user?._id ? "rgb(250, 125, 103)": "green",
                      opacity:"1",
                       "&.Mui-checked":{
                        color: sender?._id===user?._id ? "rgb(250, 125, 103)": "green",
                     }
                    }}
               />
            </div>
        )
    }


    {/* message content box */} {/* align self */}{/*flex-grow */}
    <div style={{ flexGrow:"1", display:"flex", flexDirection:"column"}}>
      
      <div  
        style={{ 
            backgroundColor: sender?._id===user?._id ? "rgb(250, 125, 103)":"rgb(7, 94,84)",
            color:"black", 
            display:"flex", 
            flexDirection:"column",
            alignSelf: sender?._id === user?._id ? "end" : "start",  
            borderRadius:"10px", 
            padding:"8px",
            boxSizing:"border-box", 
            margin:"7px 0px", 
            boxShadow:"0px 10px 15px -3px rgba(0,0,0,0.3)"
        }}
        >
        
        {/* sender  */}
        { sender && (
            <Typography 
                sx={{ 
                    color: "rgb(250, 125, 103)",
                    fontWeight:"600",
                    padding:"0 0 5px 0",
                    letterSpacing:"0.8px",
                    display: sender?._id===user?._id ? "none" : "block"
                }}
            >

                {sender.name}
            </Typography>
        )}

        {/* message content */}
        { content && (<Typography sx={{color:"white",fontWeight:"400",maxWidth:"290px",overflowWrap:"break-word", wordWrap:"break-word",lineHeight:"18px"}}> {content} </Typography>) }

        {/* attachments:- image,audio, video, files */}
        { attachments.length > 0 && attachments.map( ( attachment, idx)=>{
            
            let url = attachment.url;
            let file = fileFormat(url);

            return (
                <Box key={idx}>
                    <a
                        href={url}
                        target="_blank"
                        style={{
                            color:"black"
                        }}
                    >
                    { RenderAttachment( file, url)}
                    </a>
                </Box>
            )
        }) }

        {/* time ago */}
        <Typography sx={{color: "rgb(220,220,220)", fontSize:"14px"}}>
            {moment(createdAt).fromNow()}
        </Typography>
      </div>
    </div>

  </Box>
  )
};

export default MessageComponent;
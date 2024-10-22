import React from 'react';
import { Typography, Box } from '@mui/material';
import moment from "moment";
import { fileFormat } from '../../lib/features';
import { RenderAttachment} from "../shared/RenderAttachment";

const MessageComponent = ( { message, user}) => {

    const { content, sender, createdAt, attachments=[]} = message;

  return (
    <div style={{ backgroundColor: sender?._id===user?._id ? "rgb(250, 125, 103)":"rgb(7, 94,84)",color:"black", alignSelf: sender?._id === user?._id ? "end" : "start" ,display:"flex", flexDirection:"column", borderRadius:"10px", padding:"5px",boxSizing:"border-box"}}>
        
        {/* sender  */}
        { sender && (
            <Typography 
                sx={{ 
                    color: "rgb(250, 125, 103)",
                    fontWeight:"600",
                    letterSpacing:"0.8px",
                    display: sender?._id===user?._id ? "none" : "block"
                }}
            >

                {sender.name}
            </Typography>
        )}

        {/* message content */}
        { content && (<Typography sx={{color:"white",fontWeight:"400"}}> {content} </Typography>) }

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
  )
}

export default MessageComponent;
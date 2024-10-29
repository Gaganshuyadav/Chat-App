import { Menu, MenuItem, Typography} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setIsFileMenu } from "../../redux/features/Slices/componentSlice";
import { Image, VideoFile, AudioFile, UploadFile} from "@mui/icons-material";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../redux/api/api"; 

const FileMenu = ( { anchorEl}) => {

    const { isFileMenu} = useSelector( state=>state.component);
    const dispatch = useDispatch();
    const params = useParams();

    const handleIconButtonClose =  (e)=>{
        dispatch( setIsFileMenu( false));
      }

    const ImageRef = useRef();
    const VideoRef = useRef();
    const AudioRef = useRef();
    const FileRef = useRef();

    const imageHandler = () =>{
        ImageRef?.current.click();
    };
    const videoHandler = () =>{
        VideoRef?.current.click();
    };
    const audioHandler = () =>{
        AudioRef?.current.click();
    };
    const fileHandler = () =>{
        FileRef?.current.click();
    };

    //used as api
    const [ sendAttachments] = useSendAttachmentsMutation();

    //to send file
    const fileChangeHandler = async ( e, key) =>{
      const files = Array.from(e.target.files);
      
      if(files.length<1 ){
        return;
      }

      if( files.length>5){
        return toast.error(`You can only send 5 ${key} at a time`);
      }
      

      const toastId = toast.loading(`Sending ${key}... `);
      handleIconButtonClose();
      
      try{ 
        //form
        const formData = new FormData();

        // add files
        for(let i=0; i<files.length;i++){
            //file should not more then 6mb
            if(files[i].size >6000000){
                toast.error(`Please ensure your file is 6 MB or less`,{ id: toastId});
                return;
            }
            formData.append("attach", files[i]);
        }

        // chatid
        formData.append("chatId",params.chatId);
       
        const res = await sendAttachments(formData);

        if(res.data){ toast.success(`${key} sent successfully`,{ id: toastId});console.log(res)}
        else{ toast.error(`Failed to send ${key}`,{ id: toastId});console.log(res)};

      }
      catch(err){
        console.log(err)
        toast.error(err, { id: toastId});
      }

    }


    return(
        <Menu open={ isFileMenu} anchorEl={anchorEl} sx={{width:"100%"}} onClose={handleIconButtonClose}>

            {/* image */}
            <MenuItem onClick={imageHandler}>

                <div style={{ display:"flex"}}>
                    <div ><Image/></div>
                    <Typography sx={{ margin:"0 34px 0 7px"}}>Image</Typography>
                </div>

                <input type="file"  accept="image/png, image/jpg, image/jpeg, image/gif" ref={ ImageRef}  onChange={ (e)=>{ fileChangeHandler( e, "Images")}} style={{display:"none"}}  multiple/>
            
            </MenuItem>

             {/* Video */}
            <MenuItem onClick={videoHandler}>
    
                <div style={{display:"flex"}}>
                    <div ><VideoFile/></div>
                    <Typography sx={{ margin:"0 34px 0 7px"}}>Video</Typography>
                </div>

                <input type="file" accept="video/mp4, video/webm, video/ogg" ref={ VideoRef}  onChange={ (e)=> { fileChangeHandler(e,"Videos")}} style={{display:"none"}}  multiple/>
            
            </MenuItem>

            {/* Audio */}
            <MenuItem onClick={audioHandler}>

                <div style={{ display:"flex"}}>
                    <div ><AudioFile/></div>
                    <Typography sx={{ margin:"0 34px 0 7px"}}>Audio</Typography>
                </div>

                <input type="file" accept="audio/mp3, audio/wav" ref={ AudioRef} onChange={ (e)=>{ fileChangeHandler(e,"Audios")}} style={{display:"none"}}  multiple/>
            
            </MenuItem>

            {/* File */}
            <MenuItem onClick={fileHandler}>
                <div style={{ display:"flex"}}>
                    <div ><UploadFile/></div>
                    <Typography sx={{ margin:"0 34px 0 7px"}}>File</Typography>
                </div>
                <input type="file" accept="*" ref={ FileRef} onChange={ (e)=>{fileChangeHandler(e,"files")}} style={{display:"none"}} multiple/>
            </MenuItem>

        </Menu>
    )
}

export { FileMenu};
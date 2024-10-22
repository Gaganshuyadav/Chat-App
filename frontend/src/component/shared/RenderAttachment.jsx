import React from "react";
import { transformImage } from "../../lib/features";
import FileOpenIcon from "@mui/icons-material/FileOpen";


const RenderAttachment = ( file, url) =>{

    switch(file){

        case "image":
            return (<img 
                        src={ transformImage(url)} 
                        style={ { 
                            width:"250px",
                            objectFit:"contain",
                            }}
                        alt="image"
                    />)

        case "audio":
            return <audio controls> 
                        <source src={url} preload="none" /> 
                    </audio>

        case "video":
            return <video src={url} style={ { width:"250px"}} preload="none" controls/>

        default: 
            return <FileOpenIcon/>
    }
}

export { RenderAttachment};


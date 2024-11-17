import React from "react";
import { transformImage } from "../../lib/features";
import FileOpenIcon from "@mui/icons-material/FileOpen";


const RenderAttachment = ( file, url, width="", height="") =>{

    switch(file){

        case "image":
            return (<img 
                        src={ transformImage(url,270)} 
                        style={ {
                            objectFit:"contain",
                            borderRadius:"10px",
                            backgroundColor:"rgb(146, 91, 81)",
                            width:width,
                            height:height
                            }}
                        alt="image"
                    />)

        case "audio":
            return <audio controls> 
                        <source src={url} preload={true} /> 
                    </audio>

        case "video":
            return <video src={url} style={ { width: width ? width : "270px", heihgt:height, borderRadius:"10px"}} poster={true} preload="none" controls/>

        default: 
            return <FileOpenIcon/>
    }
}

export { RenderAttachment};


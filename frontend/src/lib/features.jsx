import moment from "moment";


const fileFormat = ( url="") =>{
    
    //fileExtention
    let fileExt = url.split(".").pop();
   
    //this condition is only for testing with unsplash
    let unsplash = url.split("/")[2];

    //video
    if( ( fileExt === "mp4") || ( fileExt==="webm") || ( fileExt==="ogg") ){
        return "video";
    }

    //audio
    if( fileExt === "mp3" || fileExt==="wav"){
        return "audio";
    }

    //image
    if( fileExt==="png" || fileExt==="jpg" || fileExt==="jpeg" || fileExt==="gif" || ( unsplash==="images.unsplash.com") ){
        return "image";
    }
    
    //file:- any file doc,pdf,wordfile,...
    return "file";
}

const transformImage = ( url="", width=200)=>{
    let transURL = url.replace("/upload",`/upload/w_${width}`);
    return transURL;
}

const getLast7Days = () => {
    const currentDate = moment();

    const last7Days = [];

    for(let i=0; i<7; i++){
        last7Days.unshift( currentDate.clone().subtract(i,"days").format("MMM DD"));
    }
    return last7Days;
}

export { fileFormat, transformImage , getLast7Days};

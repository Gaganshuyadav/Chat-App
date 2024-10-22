import AppLayout from "../component/layout/AppLayout";
import { Fragment, useRef, useState } from "react";
import { Button, IconButton} from "@mui/material";
import TextareaAutosize from "react-textarea-autosize";
import { AttachFile, Send} from "@mui/icons-material";
import FileMenu from "../component/dialogs/FileMenu";
import "./Chat.css";
import MessageComponent from "../component/shared/MessageComponent";
import { getSocket } from "../socket.jsx";
import { useParams} from "react-router-dom";
import { useGetChatDetailsQuery} from "../redux/api/api.jsx";

const Chat = () => {

  const socket = getSocket().socket;
  const params = useParams();
  //get chat details
  const {data } = useGetChatDetailsQuery( { chatId: params.chatId, populate: false} );
  console.log(data);

  const [ message, setMessage] = useState("");

  const sendMessageHandler = (e) =>{

    if(!message.trim()){
      return;
    }

    console.log(message);
    setMessage("");
    // socket.emit( "NEW_MESSAGE" , { chatId: params.chatId, members: })
  }

  //ref
  const containerRef = useRef(null);
  const [ fileMenuRef, setFileMenuRef] = useState("");

  const handleIconButtonOpen = (e)=>{
    console.log(e);
    setFileMenuRef(e.currentTarget)
  }
  const handleIconButtonClose =  (e)=>{
    setFileMenuRef(false);
  }

  const messages = [
              {
                attachments: [],
                content: "kab aa rha hai college",
                _id: "sfnsdjkfsdnfkjsbnd",
                sender: {
                  _id: "user._id",
                  name: "Chaman ",
                },
                chat: "chatId",
                createdAt: "2024-02-12T10:41:30.630Z",
              },
            
              {
                attachments: [
                  {
                    public_id: "asdsad 2",
                    url: "https://www.w3schools.com/howto/img_avatar.png",
                  },
                ],
                content: "aaj hi aa rha hu",
                _id: "sfnsdjkfsdnfkdddjsbnd",
                sender: {
                  _id: "sdfsdfsdf",
                  name: "Gaganshu",
                },
                chat: "chatId",
                createdAt: "2024-02-12T10:41:30.630Z",
              },
              {
                attachments: [
                  {
                    public_id: "video sample",
                    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                  },
                ],
                content: "",
                _id: "sfnsdjkfsdnfkjsbnd",
                sender: {
                  _id: "user._id",
                  name: "Chaman ",
                },
                chat: "chatId",
                createdAt: "2024-02-12T10:41:30.630Z",
              },
            
              {
                attachments: [
                  {
                    public_id: "video sample",
                    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                  },
                ],
                content: "aaj hi aa rha hu",
                _id: "sfnsdjkfsdnfkdddjsbnd",
                sender: {
                  _id: "sdfsdfsdf",
                  name: "Gaganshu",
                },
                chat: "chatId",
                createdAt: "2024-02-12T10:41:30.630Z",
              },
              ,
              {
                attachments: [
                  {
                    public_id: "lighthouse image" ,
                    url: "https://farm3.staticflickr.com/2220/1572613671_7311098b76_z_d.jpg",
                  },
                ],
                content: "",
                _id: "sfnsdjkfsdnfkjsbnd",
                sender: {
                  _id: "user._id",
                  name: "Chaman ",
                },
                chat: "chatId",
                createdAt: "2024-02-12T10:41:30.630Z",
              },
            
              {
                attachments: [
                  {
                    public_id: "bicycle image",
                    url: "https://farm3.staticflickr.com/2378/2178054924_423324aac8.jpg",
                  },
                ],
                content: "",
                _id: "sfnsdjkfsdnfkdddjsbnd",
                sender: {
                  _id: "sdfsdfsdf",
                  name: "Gaganshu",
                },
                chat: "chatId",
                createdAt: "2024-02-12T10:41:30.630Z",
              },
              ,
              {
                attachments: [
                  {
                    public_id: "audio sample(mp3)" ,
                    url: "https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3",
                  },
                ],
                content: "",
                _id: "sfnsdjkfsdnfkjsbnd",
                sender: {
                  _id: "user._id",
                  name: "Chaman ",
                },
                chat: "chatId",
                createdAt: "2024-02-12T10:41:30.630Z",
              },
            
              {
                attachments: [
                  {
                    public_id: "audio sample(wav)",
                    url: "https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.wav",
                  },
                ],
                content: "",
                _id: "sfnsdjkfsdnfkdddjsbnd",
                sender: {
                  _id: "sdfsdfsdf",
                  name: "Gaganshu",
                },
                chat: "chatId",
                createdAt: "2024-02-12T10:41:30.630Z",
              },
    ];

    const user = {
      _id:"sdfsdfsdf",
      name:"aman sengar",
    }


    return (
      <Fragment>

        {/* messages */}
        <div className="messagesRender" style={{height:"87%", overflow:"auto", border:"2px solid green", display:"flex", flexDirection:"column", padding:"5px 14px"}}>
      
        {
          messages?.map( ( m, idx)=>{
            return <MessageComponent key={idx} message={m} user={user} />
          })
        }

        </div>



        {/* input messages */}
        <div className="sendMessage" style={{height:"13%", display:"flex", flexDirection:"row" , alignItems:"center" , backgroundColor:"white"}}>
          
          {/* attach file icon */}
            <div  className="attachFileIcon">
                <IconButton onClick={handleIconButtonOpen}> 
                    <AttachFile/>
                </IconButton>       
            </div>

             {/* input */}
            <form >
              <TextareaAutosize 
                  value={message} 
                  onChange={ ( e)=>{ setMessage(e.target.value)}}
                  maxRows={3} 
                  minRows={1} 
                  spellCheck={false}
                  placeholder="Type Message Here..."
              />
            </form>

             {/* send icon */}
            <div className="sendIcon">
              <IconButton onClick={sendMessageHandler}>
                  <Send/>
              </IconButton>
            </div>

        </div>

        {/* File Menu */}
        <FileMenu anchorEl={ fileMenuRef} handler={handleIconButtonClose} />

      </Fragment>
    )
  }
  
export default AppLayout()(Chat);




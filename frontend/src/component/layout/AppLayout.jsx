import Title from "../shared/Title";
import Header from "./Header";
import Grid from "@mui/material/Grid2";
import ChatList from "../Specific/ChatList";
import Profile from "../Specific/Profile";
import { Drawer} from "@mui/material";
import { toast} from "react-hot-toast";
import { useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { setIsMobile} from "../../redux/features/Slices/componentSlice.jsx"; 
import { increaseNotificationCount, setNewMessagesAlert } from "../../redux/features/Slices/notifySlice.jsx";
import { getSocket } from "../../socket.jsx";

//-----
import { useMyChatsQuery} from "../../redux/api/api.jsx";
import { ALERT, NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_CHATS } from "../../lib/events.jsx";


const AppLayout = () => (WrappedComponent) =>{ 

    return (props)=>{
        const socket = getSocket().socket;
        
        const dispatch = useDispatch();
        const { isMobile} = useSelector(state=>state.component);
        const { user} = useSelector( state=>state.user);

        const { isLoading, isError, isSuccess, data, error, refetch} = useMyChatsQuery("");



        //listen friend request( increment notifi count)
        const requestEvent = (data)=>{
                dispatch( increaseNotificationCount());
        };
        useEffect(()=>{
            socket.on( NEW_REQUEST, requestEvent);
            

            return ()=>{
                socket.off( NEW_REQUEST, requestEvent);
            } 

        },[socket]);


        //increment messages alerts for each chat
        const messageAlertEvent = ( data)=>{
            dispatch( setNewMessagesAlert( {chatId: data.chatId}));
        }
        useEffect(()=>{
            socket.on( NEW_MESSAGE_ALERT, messageAlertEvent);

            return ()=>{
                socket.off( NEW_MESSAGE_ALERT,messageAlertEvent);
            }
        },[socket]);


        //refetch chats when friend request accept
        const refetchChats = ( data)=>{
            refetch();
        }
        useEffect(()=>{
            socket.on( REFETCH_CHATS, refetchChats);

            return ()=>{
                socket.off(REFETCH_CHATS, refetchChats);
            }
        },[socket]);


        //alert when new Group created
        const alert = ( data)=>{
            if( data.type && data.type==="newGroup" && data.creator && data?.creator!== user?._id){
                toast.success(data.message);
            }
            if(data.type && data.type==="addMembers"){
                toast.success(data.message);
            }
            if(data.type && data.type==="removeMembers"){
                toast.success(data.message);
            }
            if(data.type && data.user!==user._id && data.type==="leaveChat"){
                toast.success(data.message);
            }
            if(data.type && data.creator!==user._id && data.type==="deleteGroup"){
                toast.success(data.message);
            }
            
        };
        useEffect(()=>{
            socket.on( ALERT, alert);

            return ()=>{
                socket.off( ALERT, alert);
            }
        },[socket]);
        

        //for errors 
        useEffect(()=>{
            if(isError){
                toast.error(error?.data?.message);
            }

        },[ isError]);


        return(
            <>
                <Title/>
                <Header />
                <div className="layout">
                  <Grid style={{height:"90vh" }} container>
                    
                    {/* chatlist */}
                    {/* for other than xs */}
                    {/*for mobiles or xs ,the drawer comes*/}
                    <Grid 
                        size={{ xs:0,sm:4,md:4, lg:3 }} 
                        sx={{
                            display:{xs:"none", sm:"block"},
                            height:"100%",
                        }}
                    >
                        <ChatList chats={ data?.chats} />

                    {/* for phones in XS */}
                    <Drawer open={ isMobile} sx={{display:{xs:"block",sm:"none"}}} onClose={()=>{dispatch( setIsMobile(false))}}>
                        <ChatList chats={ data?.chats} />
                        
                    </Drawer>

                    </Grid>




                    {/* wrapped components */}
                    <Grid  
                        size={{ xs:12, sm:8 ,md:6 , lg:6 }}
                        style={{
                            backgroundColor:"rgb(238, 228, 226)",
                            color:"white",
                            height:"100%",
                        }} 
                    >
                    <WrappedComponent { ...props}/>
                    </Grid>




                    {/* Profile */}
                    <Grid  
                        size={{ xs:0,sm:0,md:2, lg:3 }}
                        sx={{
                            backgroundColor:"rgb(37, 37, 37)",
                            display:{xs:"none",sm:"none", md:"block"},
                            height:"100%",
                        }}
                    >
                    <Profile/>
                    </Grid>

                  </Grid>
                </div>
            </>
        );
    }; 
};

export default AppLayout;














// const AppLayout = () => {
//     return (WrappedComponent) => {
//         return (props)=>{
//             return(
//                 <div>
//                     <div>Header</div>
//                     <WrappedComponent { ...props}/>
//                     <div>Footer</div>
//                 </div>
//         )
//     } 
//   }
// }

// export default AppLayout;






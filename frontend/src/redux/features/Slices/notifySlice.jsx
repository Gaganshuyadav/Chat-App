import { createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const notifySlice = createSlice({
    name:"notify",
    initialState:{
        notificationCount: 0 ,
        newMessagesAlert: JSON.parse(localStorage.getItem("newMessagesAlert")) || [],
    },
   
    reducers:{
        increaseNotificationCount:( state, action)=>{
            state.notificationCount = state.notificationCount + 1 ;
        },
        resetNotificationCount: ( state, action)=>{
            state.notificationCount = 0 ;
        },
        setNewMessagesAlert: ( state, action)=>{
            const findChat = state.newMessagesAlert.findIndex((alert)=>{
                return alert.chatId === action.payload.chatId;
            }) 

            if(findChat !== -1){
                state.newMessagesAlert[findChat].count++;
            }
            else{
                state.newMessagesAlert.push( { chatId: action.payload.chatId, count: 1});
            }

            //set in localStorage
            localStorage.setItem("newMessagesAlert",JSON.stringify(state.newMessagesAlert)); 
        },
        removeMessagesAlert: ( state, action)=>{

            state.newMessagesAlert = state.newMessagesAlert.filter((alert)=>{
                return alert.chatId !== action.payload;
            })

            //set messages after removing 
            localStorage.setItem("newMessagesAlert",JSON.stringify(state.newMessagesAlert));

        },
    }
})


export const { increaseNotificationCount, resetNotificationCount, setNewMessagesAlert, removeMessagesAlert} = notifySlice.actions;
export default notifySlice.reducer;





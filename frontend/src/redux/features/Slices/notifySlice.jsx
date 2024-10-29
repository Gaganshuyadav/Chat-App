import { createSlice} from "@reduxjs/toolkit";


const notifySlice = createSlice({
    name:"notify",
    initialState:{
        notificationCount: 0
    },
    reducers:{
        increaseNotificationCount:( state, action)=>{
            state.notificationCount = state.notificationCount + 1 ;
        },
        resetNotificationCount: ( state, action)=>{
            state.notificationCount = 0 ;
        },
    }
})


export const { increaseNotificationCount, resetNotificationCount} = notifySlice.actions;
export default notifySlice.reducer;





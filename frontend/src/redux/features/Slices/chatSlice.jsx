import { createSlice } from "@reduxjs/toolkit";


const chatSlice = createSlice({
    name:"chat",
    initialState: {
        currentChat:"",
    },
    reducers:{
        setCurrentChat: ( state, action)=>{
            state.currentChat = action.payload; 
        },
    },
})

export const { setCurrentChat} = chatSlice.actions;

export default chatSlice.reducer;







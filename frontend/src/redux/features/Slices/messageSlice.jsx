import { createSlice } from "@reduxjs/toolkit";


const messageSlice = createSlice({
    name:"message",
    initialState:{
        selectedMessagesForDelete:[],  
        selectDeleteMessagesCount: 0,      
    },
    reducers:{
        setSelectedMessagesForDelete: (state,action)=>{
            state.selectedMessagesForDelete = action.payload;
        },
        //count operations
        setSelectDeleteMessagesCountIncrement: ( state, action)=>{
            state.selectDeleteMessagesCount = state.selectDeleteMessagesCount + 1;
        },
        setSelectDeleteMessagesCountDecrement: ( state, action)=>{
            state.selectDeleteMessagesCount = state.selectDeleteMessagesCount - 1;
        },
        setSelectDeleteMessagesCountZero: ( state, action)=>{
            state.selectDeleteMessagesCount = 0;
        },
    },
})

export const { setIsSelectedToggleForDelete, setSelectedMessagesForDelete ,setSelectDeleteMessagesCountIncrement, setSelectDeleteMessagesCountDecrement, setSelectDeleteMessagesCountZero} = messageSlice.actions;
export default messageSlice.reducer;


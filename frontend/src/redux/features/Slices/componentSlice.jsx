import { createSlice} from "@reduxjs/toolkit";

const componentSlice = createSlice({
    name: "component",
    initialState: {
        isMobile: false,
        isSearch: false,
        isNotification: false,
    },
    reducers:{
        setIsMobile : ( state, action)=>{
            state.isMobile = action.payload;
        },
        setIsSearch : (  state, action)=>{
            state.isSearch = action.payload;
        },
        setIsNotification: ( state, action)=>{
            state.isNotification = action.payload;
        },
    },

});

export const { setIsMobile, setIsSearch, setIsNotification} = componentSlice.actions;
export default componentSlice.reducer;

















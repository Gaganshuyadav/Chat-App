import { createSlice} from "@reduxjs/toolkit";

const componentSlice = createSlice({
    name: "component",
    initialState: {
        isMobile: false,
        isSearch: false,
        isNotification: false,
        isFileMenu: false,
        isNewGroup: false,
        isAddedMember: false,
        isDeleteGroup: false,
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
        setIsFileMenu: ( state, action)=>{
            state.isFileMenu = action.payload;
        },
        setIsNewGroup: ( state, action)=>{
            state.isNewGroup = action.payload;
        },
        setIsAddedGroup: ( state, action)=>{
            state.isAddedMember = action.payload;
        },
        setIsDeleteGroup: ( state, action)=>{
            state.isDeleteGroup = action.payload;
        }
    },

});

export const { setIsMobile, setIsSearch, setIsNotification, setIsFileMenu, setIsNewGroup, setIsAddedGroup, setIsDeleteGroup } = componentSlice.actions;
export default componentSlice.reducer;

















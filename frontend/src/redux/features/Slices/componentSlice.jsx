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
        isContextMenuDeleteChatDialog: false,
        isSelectedMessages: false,
        isConfirmationDialog: false,
        isDeleteGroupConfirmationMenuDialog: false,
        isLeaveGroupConfirmationMenuDialog: false,
        isDeleteChatConfirmationMenuDialog: false,
        isClearAllMessagesConfirmationMenuDialog: false,
        isUserLogoutConfirmation: false,
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
        },
        setIsContextMenuDeleteChatDialog: ( state, action)=>{
            state.isContextMenuDeleteChatDialog = action.payload;
        },
        //toggle selected messages
        setIsSelectedMessages: ( state, action)=>{
            state.isSelectedMessages = action.payload;
        },
        //dialog for confirmation 
        setIsConfirmationDialog: ( state, action)=>{
            state.isConfirmationDialog = action.payload;
        },
         //dialog for delete group dialog from menu
        setIsDeleteGroupConfirmationMenuDialog:(state, action)=>{
            state.isDeleteGroupConfirmationMenuDialog = action.payload;
        },
        //dialog for leave group chat dialog from menu
        setIsLeaveGroupConfirmationMenuDialog:(state, action)=>{
            state.isLeaveGroupConfirmationMenuDialog = action.payload;
        },
        //dialog for delete chat dialog from menu
        setIsDeleteChatConfirmationMenuDialog:(state, action)=>{
            state.isDeleteChatConfirmationMenuDialog = action.payload;
        },
        //dialog for clear chat dialog from menu
        setIsClearAllMessagesConfirmationMenuDialog: ( state, action)=>{
            state.isClearAllMessagesConfirmationMenuDialog = action.payload;
        },
        setIsUserLogoutConfirmation: ( state, action)=>{
            state.isUserLogoutConfirmation = action.payload;
        },
    },

});

export const { 
    setIsMobile, 
    setIsSearch, 
    setIsNotification, 
    setIsFileMenu, 
    setIsNewGroup, 
    setIsAddedGroup, 
    setIsDeleteGroup, 
    setIsContextMenuDeleteChatDialog, 
    setIsSelectedMessages, 
    setIsConfirmationDialog,
    setIsDeleteGroupConfirmationMenuDialog,
    setIsLeaveGroupConfirmationMenuDialog,
    setIsDeleteChatConfirmationMenuDialog,
    setIsClearAllMessagesConfirmationMenuDialog,
    setIsUserLogoutConfirmation,
 } = componentSlice.actions;



export default componentSlice.reducer;

















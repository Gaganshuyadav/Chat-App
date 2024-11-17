import { createSlice } from "@reduxjs/toolkit";
import { adminAllUsers, adminLogin, adminLogout,adminCheck, adminAllChats, adminAllMessages, adminAllDashboardInfo } from "../thunks/admin";

const adminSlice = createSlice({
    name: "admin",
    initialState:{
        isLogout: false,
        isAdmin:false,
        isLoading: false,
        dashboardIsLoading: false,
        errorForLogin: "",
        errorForLayout:"",
        messageForLogin:"",
        messageForLayout: "",
        allUsers:[],
        allChats:[],
        allMessages:[],
        allStats:"",
    },
    reducers:{
        clearErrorForLogin:(state,action)=>{
            state.errorForLogin = "";
        },
        clearErrorForLayout:(state,action)=>{
            state.errorForLayout = "";
        },
        clearMessageForLogin:(state,action)=>{
            state.messageForLogin = "";
        },
        clearMessageForLayout:(state,action)=>{
            state.messageForLayout = "";
        },
        setIsLogout:( state, action)=>{
            state.isLogout = action.payload;
        },
    },
    extraReducers: (builder)=>{
        //admin login
        builder.addCase( adminLogin.pending, ( state,action)=>{
            state.isLoading = true;
        }),
        builder.addCase( adminLogin.fulfilled, ( state, action)=>{
            state.isLoading = false;
            state.isAdmin = true;
        }),
        builder.addCase( adminLogin.rejected, ( state, action)=>{
            state.isLoading = false;
            state.errorForLogin = action.payload.message;
        }),

        //admin logout
        builder.addCase( adminLogout.pending, ( state,action)=>{
            state.isLoading = true;
        }),
        builder.addCase( adminLogout.fulfilled, ( state, action)=>{
            state.isLoading  = false;
            state.isAdmin = false;
        }),
        builder.addCase( adminLogout.rejected, ( state, action)=>{
            state.isLoading = false;
            state.errorForLogin = action.payload.message;
        }),

         //admin check
         builder.addCase( adminCheck.pending, ( state,action)=>{
            state.isLoading = true;
        }),
        builder.addCase( adminCheck.fulfilled, ( state, action)=>{
            state.isLoading  = false;
            state.isAdmin = action.payload.admin;
            state.messageForLogin = action.payload.message;
        }),
        builder.addCase( adminCheck.rejected, ( state, action)=>{
            state.isLoading = false;
            state.errorForLogin = action.payload.message;
        }),

        //admin get all users
        builder.addCase( adminAllUsers.pending, ( state, action)=>{
            state.dashboardIsLoading = true;
        }),
        builder.addCase( adminAllUsers.fulfilled, ( state, action)=>{
            state.dashboardIsLoading = false;
            state.allUsers = action.payload.users;
        }),
        builder.addCase( adminAllUsers.rejected, ( state, action)=>{
            state.dashboardIsLoading = false;
            state.errorForLayout = action.payload.message;
        }),
        
        //admin get all chats
        builder.addCase( adminAllChats.pending, ( state, action)=>{
            state.dashboardIsLoading = true;
        }),
        builder.addCase( adminAllChats.fulfilled, ( state, action)=>{
            state.dashboardIsLoading = false;
            state.allChats = action.payload.chats;
        }),
        builder.addCase( adminAllChats.rejected, ( state, action)=>{
            state.dashboardIsLoading = false;
            state.errorForLayout = action.payload.message;
        })

         //admin get all messages
         builder.addCase( adminAllMessages.pending, ( state, action)=>{
            state.dashboardIsLoading = true;
        }),
        builder.addCase( adminAllMessages.fulfilled, ( state, action)=>{
            state.dashboardIsLoading = false;
            state.allMessages = action.payload.messages;
        }),
        builder.addCase( adminAllMessages.rejected, ( state, action)=>{
            state.dashboardIsLoading = false;
            state.errorForLayout = action.payload.message;
        }),
        
         //admin get all dashboard information
         builder.addCase( adminAllDashboardInfo.pending, ( state, action)=>{
            state.dashboardIsLoading = true;
        }),
        builder.addCase( adminAllDashboardInfo.fulfilled, ( state, action)=>{
            state.dashboardIsLoading = false;
            state.allStats = action.payload.stats;
        }),
        builder.addCase( adminAllDashboardInfo.rejected, ( state, action)=>{
            state.dashboardIsLoading = false;
            state.errorForLayout = action.payload.message;
        })
    }
})

export const { clearErrorForLogin, clearErrorForLayout, clearMessageForLogin, clearMessageForLayout, setIsLogout } = adminSlice.actions;

export default adminSlice.reducer;

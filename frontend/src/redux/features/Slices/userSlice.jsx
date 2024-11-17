import { createSlice} from "@reduxjs/toolkit";
import { login, register, getMyProfile, logout} from "../thunks/user";

export const userSlice = createSlice({
    name: "user",
    initialState:{
        user: null,
        isLogin: false,
        isLoading: false,
        error: null,
        success: false,
        message: "",
    },
    reducers:{
        clearError: ( state, action)=>{
            state.error = null;
        },
        clearSuccess: ( state, action)=>{
            state.success = false;
        },
    },
    extraReducers: (builder)=>{
        //login
        builder.addCase( login.pending, ( state, action)=>{
            state.isLoading = true;
            state.success = false;
            state.isLogin = false;
        }),
        builder.addCase( login.fulfilled, ( state, action)=>{
            state.user = action.payload.user;
            state.isLoading = false;
            state.isLogin = true;
            state.success = true;
        }),
        builder.addCase( login.rejected, ( state, action)=>{
            state.error = action.payload.message;
            state.isLoading = false;
            state.success = false;
        }),
        //register
        builder.addCase( register.pending, ( state, action)=>{
            state.isLoading = true;
            state.success = false;
            state.isLogin = false;
        }),
        builder.addCase( register.fulfilled, ( state, action)=>{
            state.user = action.payload.user;
            state.isLoading = false;
            state.user = action.payload.user;
            state.isLogin = true;
            state.success = true;
        }),
        builder.addCase( register.rejected, ( state, action)=>{
            state.isLoading = false;
            state.error = action.payload.message;
            state.success = false;
        }),
        //get my profile details
        builder.addCase( getMyProfile.pending, ( state, action)=>{
            state.isLoading = true;
            state.success = false;
        }),
        builder.addCase( getMyProfile.fulfilled, ( state, action)=>{
            state.user = action.payload.user;
            state.isLoading = false;
            state.isLogin = true;
            state.success = true;
        }),
        builder.addCase( getMyProfile.rejected, ( state, action)=>{
            state.error = action.payload.message;
            state.isLoading  = false;
        }),
        //logout
        builder.addCase( logout.pending, ( state, action)=>{
            state.isLoading = true;
        }),
        builder.addCase( logout.fulfilled, ( state, action)=>{
            state.user = null;
            state.isLoading = false;
            state.isLogin = false;
            state.success = true;
        }),
        builder.addCase( logout.rejected, ( state, action)=>{
            state.error = action.payload.message;
            state.isLoading = false;
        })
    }
})

export const { clearError, clearSuccess} = userSlice.actions;

export default userSlice.reducer;









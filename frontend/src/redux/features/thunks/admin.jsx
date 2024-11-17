import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server} from "../../../utils/config";


const token = localStorage.getItem("chit-chat-Admin-Token");

// admin login
export const adminLogin = createAsyncThunk("admin/login", async( formData, { rejectWithValue} )=>{
    
    try{
        const { data} = await axios.post(`${server}/api/v1/admin/verify`, formData, { withCredentials:true, headers:{ "Content-Type":"application/json"} });
        localStorage.setItem("chit-chat-Admin-Token",data.token);
        return data;
    }
    catch(err){
        if(err?.response?.data){
            return rejectWithValue({ message: err.response.data.message});
        }
        else{
            return rejectWithValue({ message: err.message});
        }
    }
})

//admin logout
export const adminLogout = createAsyncThunk("admin/logout", async( noPara, { rejectWithValue})=>{
    try{
        const { data} = await axios.get(`${server}/api/v1/admin/logout`, { withCredentials: true, headers: { "Content-Type":"application/json", "Authorization":`Bearer ${token}`}});
        localStorage.setItem("chit-chat-Admin-Token", "");
        return data;
    }
    catch(err){
        if(err.response?.data){
            return rejectWithValue({ message: err.response.data.message});
        }
        else{
            return rejectWithValue({message: err.message});
        }
    }
})


//admin check
export const adminCheck = createAsyncThunk("admin/check", async( noPara, { rejectWithValue})=>{
    try{
        const { data} = await axios.get(`${server}/api/v1/admin`, { withCredentials: true, headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${token}`}});
        return data;
    }
    catch(err){
        if(err.response){
            return rejectWithValue({message:err.response.data.message});
        }
        else{
            return rejectWithValue({ message: err.message});
        }
    }
})

//admin all users
export const adminAllUsers = createAsyncThunk("admin/allUsers", async( noPara, { rejectWithValue})=>{
    try{
        const { data} = await axios.get(`${server}/api/v1/admin/users`, { withCredentials:true, headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${token}`}});
        return data;
    }
    catch(err){
        if(err.response?.data){
            return rejectWithValue({message: err.response.data.message});
        }
        else{
            rejectWithValue({message:err.message});
        }
    }
})

//admin all chats
export const adminAllChats = createAsyncThunk("admin/allChats", async( noPara, { rejectWithValue})=>{
    try{
        const { data} = await axios.get(`${server}/api/v1/admin/chats`, { headers:{"Content-Type":"application/json", "Authorization":`Bearer ${token}`}, withCredentials:true});
        return data;
    }
    catch(err){
        if(err.response){
            return rejectWithValue({ message: err.response.data.message});
        }
        else{
            return rejectWithValue({message: err.message});
        }
    }
})


//admin all messages
export const adminAllMessages = createAsyncThunk("admin/allMessages", async( noPara, { rejectWithValue})=>{
    try{
        const { data} = await axios.get(`${server}/api/v1/admin/messages`, { headers:{"Content-Type":"application/json", "Authorization":`Bearer ${token}`}, withCredentials:true});
        return data;
    }
    catch(err){
        if(err.response){
            return rejectWithValue({ message: err.response.data.message});
        }
        else{
            return rejectWithValue({message: err.message});
        }
    }
})



//admin get all dashboard information
export const adminAllDashboardInfo = createAsyncThunk("admin/allDashboardInformation", async( noPara, { rejectWithValue})=>{
    try{
        const { data} = await axios.get(`${server}/api/v1/admin/stats`, { headers:{"Content-Type":"application/json", "Authorization":`Bearer ${token}`}, withCredentials:true});
        return data;
    }
    catch(err){
        if(err.response){
            return rejectWithValue({ message: err.response.data.message});
        }
        else{
            return rejectWithValue({message: err.message});
        }
    }
})








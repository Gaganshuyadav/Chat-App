import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server} from "../../../utils/config";

//login
export const login = createAsyncThunk("/user/login", async ( formData, { rejectWithValue})=>{
    try{
        const { data} = await axios.post(`${server}/api/v1/user/login`, formData, { withCredentials: true , headers: { "Content-Type":"application/json"}});
        localStorage.setItem("chit-chat-Token",data.token);
        return data;
    }
    catch(err){
        if(err.response.data){
            return rejectWithValue({ message: err.response.data.message});
        }
        else{
            return rejectWithValue({ message: err.message});
        }
    }
})

//register
export const register = createAsyncThunk("/user/signup", async( formData, { rejectWithValue})=>{
    try{
        const { data} = await axios.post(`${server}/api/v1/user/new`, formData, { withCredentials: true, headers: { "Content-Type":"multipart/form-data"}});
        localStorage.setItem("chit-chat-Token",data.token);
        return data;
    }
    catch(err){
        if(err.response.data){
            return rejectWithValue({ message: err.response.data.message});
        }
        else{
            return rejectWithValue({ message: err.message});
        }
    }
})

//get my Profile Details
export const getMyProfile = createAsyncThunk("user/me", async ( noPara, { rejectWithValue})=>{
    const token = localStorage.getItem("chit-chat-Token");
    try{
        const { data} = await axios.get(`${server}/api/v1/user/me`, { withCredentials: true, headers: { "Content-Type":"application/json", "Authorization":`Bearer ${token}`}});
        return data;
    }
    catch(err){
        if(err.response){
            return rejectWithValue({ message: err.response.data.message});
        }
        else{
            return rejectWithValue({ message: err.message});
        }
    }
})

//logout
export const logout = createAsyncThunk("user/logout", async( noPara,{ rejectWithValue})=>{
    const token = localStorage.getItem("chit-chat-Token");
    try{
        const { data} = await axios.get(`${server}/api/v1/user/logout`, { withCredentials: true, headers: { "Content-Type":"application/json",  "Authorization":`Bearer ${token}`}});
        localStorage.removeItem("chit-chat-Token");
        return data;
    }
    catch(err){
        console.log(err)
        if(err.response){
            return rejectWithValue({ message: err.response.data.message});
        }
        else{
            return rejectWithValue({ message: err.message});
        }
    }
})





import { useState, Fragment, useEffect} from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { TextField, Typography, CircularProgress } from "@mui/material";
import "../LoginSignUp.css";
import { useNavigate} from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { adminLogin, adminCheck } from "../../redux/features/thunks/admin";
import { clearErrorForLogin, clearMessageForLogin, setIsLogout } from "../../redux/features/Slices/adminSlice";
import { toast} from "react-hot-toast";

export default function Login(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, errorForLogin, messageForLogin, isAdmin , isLogout} = useSelector(state=>state.admin);

    //login state
    const [ loginPassword, setLoginPassword] = useState("");

    //login form submit
    const handleLoginSubmit = (e) =>{
      e.preventDefault();
      
      if(loginPassword.trim()===""){
        return;
      }

      dispatch( adminLogin({secretKey: loginPassword}));
      setLoginPassword("");
      
    }

      //admin ckeck call
      useEffect(()=>{
        
        if(!isLogout){
          dispatch(adminCheck());
        }
    
    },[isLogout]);


      //redirect
    if(isAdmin){
        dispatch(setIsLogout(false));
        navigate("/admin/dashboard");
    }


    //error for login
    useEffect(()=>{

      if(errorForLogin){
        toast.error(errorForLogin);
        dispatch(clearErrorForLogin());
      }
    },[errorForLogin]);

    //message for login
    useEffect(()=>{
      if(messageForLogin){
        toast.success(messageForLogin);
        dispatch(clearMessageForLogin());
      }
    },[messageForLogin]);


    return (
        <Fragment>
          {
            isLoading
            ?
            <div style={{ width:"100vw", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
              <CircularProgress size={40} sx={{ color:"green"}}/>
            </div>
            :
            (<div className="loginPage">
            <Grid container size={{xs:10, sm:10, md:4, lg:4, xl:6}}>
              <Paper elevation={17} style={{width:"100%"}}>

                <Typography>Admin Login</Typography>
                <form className="loginForm" onSubmit={handleLoginSubmit}>
            
                    <div className="loginPassword">
                    <TextField type="password" value={loginPassword} onChange={(e)=>{ setLoginPassword(e.target.value)}} fullWidth color="warning" label="Secret Key" variant="outlined"/>
                    </div>
                    <button><Typography>LOGIN</Typography></button>

                </form>

              </Paper>
            </Grid>
            </div>)
          }

        </Fragment>
    )
  }
  
import { useState, Fragment} from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { TextField, Typography } from "@mui/material";
import "../LoginSignUp.css";
import { useNavigate} from "react-router-dom";

export default function Login(){

    const isAdmin = true;
    const navigate = useNavigate();

    //login state
    const [ loginPassword, setLoginPassword] = useState("");

    //login form submit
    const handleLoginSubmit = (e) =>{
      e.preventDefault();
      console.log("admin login");
    }

    if(isAdmin){
        navigate("/admin/dashboard");
    }

    return (
        <Fragment>

            <div className="loginPage">
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
            </div>

        </Fragment>
    )
  }
  
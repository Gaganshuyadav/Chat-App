import { useState, Fragment, useEffect} from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { TextField, Typography, CircularProgress, Box } from "@mui/material";
import "./LoginSignUp.css";
import { useNavigate} from "react-router-dom";
import profilePic from "/images/Profile.png"; 
import Avatar from '@mui/material/Avatar';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useSelector, useDispatch} from "react-redux";
import { login, register} from "../redux/features/thunks/user";
import { clearError, clearSuccess} from "../redux/features/Slices/userSlice";
import { toast} from "react-hot-toast";
import { useMyChatsQuery } from "../redux/api/api";

export default function Login(){

    const dispatch = useDispatch();
    const {  user, error, isLoading, success, isLogin} = useSelector( state => state.user);

    const navigate = useNavigate();

    const myChatsQueryRR = useMyChatsQuery();
    //toggle login and signup
    const [ loginToggle, setLoginToggle] = useState(true);


    //signup state
    const [ name, setName] = useState("");
    const [ username, setUsername] = useState("");
    const [ bio, setBio] = useState("");
    const [ password, setPassword] = useState("");
    const [ confirmPassword, setConfirmPassword] = useState("");
    //image load
    const [ avatar, setAvatar] = useState("");
    const [ avatarPreview, setAvatarPreview] = useState("");

    //login state
    const [ loginUsername, setLoginUsername] = useState("");
    const [ loginPassword, setLoginPassword] = useState("");

    //avatar image url
    const handleAvatar = (e) =>{
      console.log(e.target.files[0])

      //file should not more then 6mb
      if(e.target.files[0].size >6000000){
        toast.error(`Please ensure your file is 6 MB or less`);
        return;
    }
      
      //for multer send file
      setAvatar(e.target.files[0]);

      const reader = new FileReader();
        reader.onload = (e) => {
          if(reader.readyState==2){
            setAvatarPreview(reader.result);
          }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    //login form submit
    const handleLoginSubmit = (e) =>{
      e.preventDefault();
      const formData = new FormData();
      formData.append("username", loginUsername);
      formData.append("password", loginPassword);

      dispatch( login(formData));

    }

    //signup form submit
    const handleSignupSubmit = (e) =>{
      e.preventDefault();
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("name", name);
      formData.append("username",username);
      formData.append("bio",bio);
      formData.append("password",password);
      formData.append("confirmPassword",confirmPassword);

      dispatch( register(formData));
    }

    //if loggedin redirect to home page
   useEffect(()=>{
    if(isLogin){
      navigate("/");
    }
   },[isLogin])
    


    useEffect(()=>{
      if(error){
        toast.error(error); 
        console.log(error);
        dispatch(clearError());
      }
      if(success){
        toast.success("User Login Successfully");
        dispatch( clearSuccess());
      }
    
    },[ error, success, isLogin]);

    return (
      <Fragment>
      {
        isLoading
        ?
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", width:"100vw", height:"100vh"}}>
          <CircularProgress size={60} sx={{color:"rgb(250, 125, 103)"}}/>
        </Box>
        :
        (
          <Fragment>
        {
            loginToggle

            ?
            <div className="loginPage">
            <Grid container size={{xs:10, sm:10, md:4, lg:4, xl:6}}>
              <Paper elevation={17} style={{width:"100%"}}>
                <Typography>Login</Typography>
                <form className="loginForm" onSubmit={handleLoginSubmit}>
                    <div className="loginUsername">
                    <TextField type="text" value={loginUsername} onChange={(e)=>{ setLoginUsername(e.target.value)}} fullWidth color="warning" label="Enter Username" variant="outlined"/>
                    </div>
                    <div className="loginPassword">
                    <TextField type="password" value={loginPassword} onChange={(e)=>{ setLoginPassword(e.target.value)}} fullWidth color="warning" label="Enter Password" variant="outlined"/>
                    </div>
                    <button><Typography>LOGIN</Typography></button>
                </form>

                <Typography style={{fontSize:"17px"}} >OR</Typography>

                <div className="toggleLogin">
                    <div>Don't have an account?</div>
                    <button onClick={ ()=>{ setLoginToggle(false)} }   style={{fontSize:"17px"}}>Sign up</button>
                </div>
              </Paper>
            </Grid>
            </div>

            :

            <div className="signupPage">
            <Grid container size={{xs:10, sm:10, md:4, lg:4, xl:6}}>
              <Paper elevation={17} style={{width:"100%"}}>
                <Typography>Sign Up</Typography>
                <form className="signupForm"  onSubmit={handleSignupSubmit} >

                    <div className="profile">
                      <div className="PreviewImage">
                        <img src={ avatarPreview ? avatarPreview : profilePic} />
                        
                        <div className="profileBox">
                        <Avatar>
                          <input type="file" accept="image/*" onChange={ handleAvatar} />
                        </Avatar>
                        <CameraAltIcon/>
                        </div>
                      </div>
                    </div>

                    <div className="signupName">
            
                    <TextField type="text" value={ name} onChange={(e)=>setName(e.target.value)}    fullWidth color="warning" label="Name *" variant="outlined"/>
                    </div>
                    <div className="signupUsername">
                    <TextField type="text" value={ username} onChange={(e)=>setUsername(e.target.value)}    fullWidth color="warning" label="Username *" variant="outlined"/>
                    </div>
                    <div className="signupBio">
                    <TextField  type="text" value={ bio} onChange={(e)=>setBio(e.target.value)} fullWidth color="warning" label="Bio *" variant="outlined"/>
                    </div>
                    <div className="signupPassword">
                    <TextField type="password" value={ password} onChange={(e)=>setPassword(e.target.value)} fullWidth color="warning" label="Password *" variant="outlined"/>
                    </div>
                    <div className="signupConfirmPasssword">
                    <TextField  type="password" value={ confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} fullWidth color="warning" label="ConfirmPassword *" variant="outlined"/>
                    </div>
                    <button><Typography>SIGN UP</Typography></button>
                </form>

                <Typography style={{textAlign:"center",fontSize:"17px"}}>OR</Typography>

                <div className="toggleSignup">
                    <div>Already have an account?</div>
                    <button onClick={ ()=>{ setLoginToggle(true)}} style={{fontSize:"17px"}}>Login</button>
                </div>
              </Paper>
            </Grid>
            </div>
        }
        </Fragment>
        )

      }
      </Fragment>
    )
  }
  
import { useState, useEffect} from 'react'
import { Dialog, DialogTitle, TextField, Box, InputAdornment, List, CircularProgress } from "@mui/material";
import { Search } from '@mui/icons-material';
import UserItem from '../shared/UserItem';
import { useSelector, useDispatch } from 'react-redux';
import { setIsSearch} from "../../redux/features/Slices/componentSlice";
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../../redux/api/api.jsx";
import { toast} from "react-hot-toast";

const SearchDialog = () => {
 
  const { isSearch} = useSelector( state=> state.component);
  const dispatch = useDispatch();

  const [ searchUser] = useLazySearchUserQuery();
  const [ sendFriendRequest] = useSendFriendRequestMutation();

  //states
  const [ search, setSearch] = useState("");
  const [ users, setUsers] = useState([]);
  const [ isLoading, setIsLoading] = useState(true);

  const [ isLoadingSendFriendRequest, setIsLoadingSendFriendRequest ] = useState(false);

  //handlers
  const searchHandler = ( e) =>{
    setSearch(e.target.value);
  } 

  //send friend request
  const addFriendsHandler = ( id) =>{

    const toastId = toast.loading("Sending Friend Request");
    setIsLoadingSendFriendRequest(true);  //used to disabled the  button

    sendFriendRequest( { userId: id})
    .then((result)=>{
    
      setIsLoadingSendFriendRequest(false);

      if(result.data && result.data.success){
        toast.success(result.data.message, { id: toastId});
      }
      else if(result.error && result.error.data){
        toast.error(result.error.data.message, { id: toastId});
      }
      else{
        toast.error("Something Went Wrong", { id: toastId});
      }
    })
    .catch((error)=>{
      setIsLoadingSendFriendRequest(false);
      toast.error("Something went wrong", { id: toastId});
    })
  }


  //useEffect for searching
  useEffect(()=>{
    
    const timeoutId = setTimeout(()=>{

      searchUser( search)
      .then(( result)=>{
        setUsers(result?.data?.users);
        setIsLoading(result.isLoading);
        
      })
      .catch((err)=>{
        console.log(err);
      })

    },1000);

    return ()=>{ 
      //clear all previous timers
      clearTimeout(timeoutId);
    } 
  },[ search]);


  return (
    <Dialog open={isSearch} onClose={()=>{ dispatch( setIsSearch(false))}} >
      <Box sx={{width:{xs:"80vw",sm:"60vw",md:"50vw",lg:"30vw"}}}>

        <DialogTitle sx={{textAlign:"center"}}>Find People</DialogTitle>

        < div className="search" style={{ width:"100%", display:"flex", alignItems:"center", margin:"0 auto"}} >
          <TextField 
              type="text"  
              value={search}
              onChange={searchHandler}
              style={{ margin:"auto", width:"80%"}} 
              InputProps={{
                startAdornment:(
                  <InputAdornment>
                      <Search/>
                  </InputAdornment>
                )
              }}
          />
        </div>

        {
          isLoading
          ?
          <Box sx={{ height:"200px", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <CircularProgress sx={{color:"black"}}/>
          </Box>
          :
          <Box className="users" sx={{width:"90%", margin:"0 auto"}}>
            <List>
              {
                users && users.map((user)=>{
                  return(
                        <UserItem key={user._id} user={ user} handler={addFriendsHandler} handlerIsLoading={isLoadingSendFriendRequest} /> 
                  )
                })
              }
            </List>
          </Box>
        }



      </Box>
    </Dialog>
  )
}

export default SearchDialog
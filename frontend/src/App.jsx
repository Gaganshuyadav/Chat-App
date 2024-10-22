import './App.css'
import { Suspense, lazy, useEffect} from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
// users components
const Home = lazy(() => import("./pages/Home"));
const LoginSignUp = lazy(() => import("./pages/LoginSignUp"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups")); 
const Profile = lazy(()=>import("./component/Specific/Profile"));
// admin components
import AdminLogin from './pages/Admin/AdminLogin';
import Dashboard from './pages/Admin/Dashboard';
import UserManagement from './pages/Admin/UserManagement';
import ChatManagement from './pages/Admin/ChatManagement';
import MessageManagement from './pages/Admin/MessageManagement';
// helping components
import NotFound from "./pages/NotFound/NotFound";
import SkeletonLoader from './component/layout/SkeletonLoader';
import { server} from "./utils/config.jsx";
import { getMyProfile} from "./redux/features/thunks/user.jsx";
import { useDispatch, useSelector} from "react-redux";
import {  clearError} from "./redux/features/Slices/userSlice.jsx";
import { SocketProvider} from "./socket.jsx";//this contains the socket io link 
import AuthRoute from './component/Route/AuthRoute.jsx';  

function App() {

  const dispatch = useDispatch();
  const { isLogin, isLoading, user} = useSelector( state=>state.user);
  const navigate = useNavigate()
 
  useEffect(()=>{

  dispatch( getMyProfile());
  
  }, []);

  return (
    <>
    <Suspense fallback={<SkeletonLoader/>}>
      <Routes>
        {/* user */}
            <Route path="/" element={<SocketProvider> <Home/> </SocketProvider>} />
            <Route path="/chat/:chatId" element={ <SocketProvider> <Chat/> </SocketProvider>} />
            <Route path="/groups" element={ <SocketProvider> <Groups/> </SocketProvider>} />
        
        <Route path="/login" element={<LoginSignUp/>} />
        {/* for mobile size profile is separated */}
        <Route path="/profile" element={<Profile/>}/>
      
        {/* admin */}
        <Route path="/admin" element={<AdminLogin/>} />
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/users-management" element={<UserManagement/>}/>
        <Route path="/admin/chats-management" element={<ChatManagement/>}/>
        <Route path="/admin/messages" element={<MessageManagement/>}/>

        {/* not found */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Suspense>
    </>
  )
}

export default App

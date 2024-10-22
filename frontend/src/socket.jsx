import { createContext} from "react";
import { io} from "socket.io-client";
import { server} from "./utils/config";
import { useContext } from "react";

const SocketContext = createContext();

export const getSocket = () => useContext( SocketContext);

const token = localStorage.getItem("chit-chat-Token");
export const SocketProvider = ( { children})=>{

    const socket = io(server, { withCredentials: true, extraHeaders: { "Authorization":`Bearer ${token}`}});

    return <SocketContext.Provider value={{socket}} >{children}</SocketContext.Provider>
}
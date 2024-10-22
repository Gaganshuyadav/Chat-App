import { userSocketIDs} from "../app.js";

export const getSockets = ( users=[]) =>{

    const sockets = users.map( ( user)=>{
        return userSocketIDs.get(user.toString());
    })
    
    return sockets;
}



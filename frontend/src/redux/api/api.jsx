import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { server} from "../../utils/config";

const token = localStorage.getItem("chit-chat-Token");

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1`}),
    //this have cache behaviour( if you make same request multiple times , the browser will return the cached response instead of sending a new request to the server).
    tagTypes: ["Chat","User"],

    endpoints: ( builder)=> ({
        myChats: builder.query({
            query:()=>({
                url: "/chat/my",
                credentials: "include",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`,
                }
            }),
            providesTags: ["Chat"],
        }),
        searchUser: builder.query({
            query: ( name)=>({
                url: `/user/search?name=${name}`,
                credentials: "include",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`,
                }
            }),
            // use cache data
            providesTags: ["User"],
        }),
        sendFriendRequest: builder.mutation({
            query: ( data)=>({
                url: `/user/sendrequest`,
                method: "POST",
                body: data,
                credentials: "include",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`, 
                },
            }),
             //not using cache data
            invalidatesTags: ["User"],
        }),
        getNotifications: builder.query({
            query: ()=>({
                url: `/user/notifications`,
                credentials: "include",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`,
                },
            }),
              //it means that data will be removed immediately ( No Caching), you can control how long data is kept in the cache.
              keepUnusedDataFor: 0,
        }),
        acceptFriendRequest: builder.mutation({
            query: ( data)=>({
                url: `/user/acceptrequest`, 
                method: "POST",
                body: data,
                credentials: "include",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`,
                }
            }),
            invalidatesTags: ["Chat"],
        }),
        getChatDetails: builder.query({
            query: ( { chatId, populate=false } )=>{

                let url = `/chat/${chatId}`;
                if(populate) url += "?populate=true";

                return {
                    url: url,
                    credentials: "include",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    },
                };
            },
            providesTags: ["Chat"],
        }),
    })
})


export default api;
export const { 
    useMyChatsQuery, 
    useLazySearchUserQuery, 
    useSendFriendRequestMutation, 
    useGetNotificationsQuery,
    useAcceptFriendRequestMutation,
    useGetChatDetailsQuery,
} = api;




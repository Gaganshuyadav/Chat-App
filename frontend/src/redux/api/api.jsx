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
        getMessages: builder.query({
            query: ( { chatId, page=1 } )=>({
                url: `/chat/message/${chatId}?page=${page}`,
                credentials:"include",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`,
                }
            }),
            keepUnusedDataFor: 0,
        }),
        sendAttachments: builder.mutation({
            query: ( formData)=>({
                url: `/chat/message`,
                method:"POST",
                body: formData,
                credentials: "include",
                headers:{
                    "Authorization":`Bearer ${token}`,
                }
            }),
        }),
        getMyFriends: builder.query({
            query: ( chatId="")=>{

                let url = `/user/friends`;
                if(chatId){
                    url += `?chatId=${chatId}`;
                }

                return{
                    url ,
                    credentials: "include",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
                }
            },
            providesTags: ["Chat"],
        }),
        makeNewGroup: builder.mutation({
            query: ( { name, members})=>({
                url: "/chat/new",
                method:"POST",
                body: { name, members},
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`,
                }
            }),
            invalidatesTags:["Chat"],
        }),
        getMyGroups: builder.query({
            query: ()=>({
                url: "/chat/my/groups",
                credentials: "include",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`,
                }
            }),
            providesTags: ["Chat"],
        }),
        renameGroup: builder.mutation({
            query: ( { name, chatId })=>({
                url: `/chat/${chatId}`,
                method:"PUT",
                credentials: "include" ,
                body: { name},
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`,
                }
            }),
            invalidatesTags: ["Chat"],
        }),
        removeGroupMember: builder.mutation({
            query: ({ userId, chatId})=>({
                url: "/chat/removeMembers",
                method:"PUT",
                credentials: "include",
                body: { chatId, userId},
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`,
                }
            }),
            invalidatesTags: ["Chat"],
        }),
        addGroupMembers: builder.mutation({
            query: ({ chatId, members})=>({
                url: "/chat/addMembers",
                body:{ chatId, members},
                method:"PUT",
                credentials: "include",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`,
                }
            }),
            invalidatesTags: ["Chat"],
        }),
        deleteChat: builder.mutation({
            query:( chatId)=>({
                url: `/chat/${chatId}`,
                method:"DELETE",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`,
                }
            }),
            invalidatesTags: ["Chat"],
        }),
        leaveGroup: builder.mutation({
            query: ( chatId)=>({
                url: `/chat/leave/${chatId}`,
                method: "DELETE",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            }),
            invalidatesTags: ["Chat"],
        }),
        deleteMessages: builder.mutation({
            query: ({chatId, messageArray=[], all=false})=>{

                let url = `/chat/message/del/${chatId}`;
                let body = { chatId, messageArray};

                console.log("chatId ",chatId, " messageArray ",messageArray, "all ",all);
                if(all){
                    url += "?all=true";
                    body = {};
                }

                return {
                url ,
                method:"DELETE",
                body,
                credentials: "include",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`,
                },
            }
          }, 
          keepUnusedDataFor:0,
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
    useGetMessagesQuery,
    useSendAttachmentsMutation,
    useGetMyFriendsQuery,
    useMakeNewGroupMutation,
    useGetMyGroupsQuery,
    useRenameGroupMutation,
    useRemoveGroupMemberMutation,
    useAddGroupMembersMutation,
    useDeleteChatMutation,
    useLeaveGroupMutation,
    useDeleteMessagesMutation,
} = api;




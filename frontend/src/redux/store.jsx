import { configureStore} from "@reduxjs/toolkit";
import userReducer from "../redux/features/Slices/userSlice";
import componentReducer from "./features/Slices/componentSlice.jsx";
import notifyReducer from "./features/Slices/notifySlice.jsx";
import chatReducer from "./features/Slices/chatSlice.jsx";
import messageReducer from "./features/Slices/messageSlice.jsx";
import api from "./api/api.jsx";

const store = configureStore({
    reducer: {
        user: userReducer,
        component: componentReducer,
        notify: notifyReducer,
        chat: chatReducer,
        message: messageReducer,
        [api.reducerPath]: api.reducer,

    },
    middleware: ( defaultMiddleware) => [ ...defaultMiddleware(),
        api.middleware
    ],
})


export default store;

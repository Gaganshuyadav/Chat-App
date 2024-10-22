import { configureStore} from "@reduxjs/toolkit";
import userReducer from "../redux/features/Slices/userSlice";
import componentReducer from "./features/Slices/componentSlice.jsx";
import api from "./api/api.jsx";

const store = configureStore({
    reducer: {
        user: userReducer,
        component: componentReducer,
        [api.reducerPath]: api.reducer,

    },
    middleware: ( defaultMiddleware) => [ ...defaultMiddleware(),
        api.middleware
    ],
})


export default store;

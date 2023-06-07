import { api } from "../utils/api";
import perfumesSlice from "./slices/perfumesSlice";
import userSlice from "./slices/userSlice";

const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {
        user: userSlice,
        perfumes: perfumesSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: api
        }
    })
})

export default store;
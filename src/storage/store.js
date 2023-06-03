import productsSlice from "./slices/productsSlice";
import userSlice from "./slices/userSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {
        user: userSlice,
        products: productsSlice,
    }
})

export default store;
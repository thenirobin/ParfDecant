import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: [],
    loading: false,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setList(state, action) {
            state.data = action.payload;
        }
    }
})

export const { setList } = productsSlice.actions;

export default productsSlice.reducer;
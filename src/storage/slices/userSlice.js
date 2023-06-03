import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../utils/api"

const initialState = {
    data: {},
    loading: false,
}

export const getUser = createAsyncThunk('user/getUser', async function () {
    const data = await api.getUserInfo();
    return data;
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        // builder.addCase(updateUser => {});
    }
})

export default userSlice.reducer;
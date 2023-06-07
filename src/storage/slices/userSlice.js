import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../utils/api"
import { isError, isLoading } from "../utilStorage";

const initialState = {
    data: {},
    loading: false,
}

export const getUser = createAsyncThunk('user/getUser', async function () {
    const data = await api.getUserInfo();
    return data;
});

export const updateUser = createAsyncThunk('updateUser', async function (data) {
    if (data.avatar) {
        const res = await api.updateUserAvatar({avatar: data.avatar});
        return res;
    } else {
        const res = await api.updateUserInfo({name: data.name, about: data.about});
        return res;
    }
})



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder.addCase(getUser.pending, (state, action) => {
        //     state.loading = true;
        // });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addMatcher(isError, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addMatcher(isLoading, (state) => {
            state.loading = true;
        });
    }
})

export default userSlice.reducer;
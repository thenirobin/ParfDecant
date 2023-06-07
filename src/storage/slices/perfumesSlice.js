import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../utils/api"
import { isError, isLoading } from "../utilStorage";
import { filteredCards, findFav, perfumeRating } from "../../utils/utils";
import { CHEAPEST, EXPENSIVE, NEWEST, POPULAR, RATE, SALE } from "../../constants/constants";

const initialState = {
    perfumes: [],
    loading: false,
    total: 0,
    favorites: []
}

export const fetchPerfumes = createAsyncThunk('perfumes/fetchPerfumes', async (_, {fulfillWithValue, getState, rejectWithValue} ) => {
    try {
        const state = getState();
        const data = await api.getPerfumesList();
        return fulfillWithValue({...data, userId: state.user.data?._id});
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchChangePerfumeFav = createAsyncThunk('perfumes/fetchChangePerfumeFav', async function (data, arg) {
    try {
        const updatedCard = await api.changePerfumeLike(data.product._id, data.wasLiked);
        return arg.fulfillWithValue({updatedCard, wasLiked: data.wasLiked})
    } catch (error) {
        return arg.rejectWithValue(error);
    }
});

export const searchPerfumeByQuery = createAsyncThunk('perfumes/searchPerfumeByQuery', async function (search, {fulfillWithValue, rejectWithValue}) {
    try {
        const finded = api.searchPerfumes(search);
        return fulfillWithValue(finded);
    } catch (error) {
        return rejectWithValue(error);
    }
})

const perfumesSlice = createSlice({
    name: 'perfumes',
    initialState,
    reducers: {
        sortedPerfumes: (state, action) => {
            switch (action.payload) {
                case POPULAR:
                    state.perfumes = state.perfumes.sort((a,b) => b.likes.length - a.likes.length);
                    break;
                case NEWEST: 
                    state.perfumes = state.perfumes.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
                    break;
                case CHEAPEST:
                    state.perfumes = state.perfumes.sort((a,b) => a.price - b.price);
                    break;
                case EXPENSIVE:
                    state.perfumes = state.perfumes.sort((a,b) => b.price - a.price);
                    break;
                case SALE:
                    state.perfumes = state.perfumes.sort((a,b) => b.discount - a.discount);
                    break;
                case RATE:
                    state.perfumes = state.perfumes.sort((a,b) => perfumeRating(b.reviews) - perfumeRating(a.reviews));
                    break;
                default: break;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPerfumes.fulfilled, (state, action) => {
            const authorCards = filteredCards(action.payload.products) ?? [];
            state.perfumes = authorCards;
            state.favorites = authorCards.filter(e => findFav(e, action.payload.userId))
            state.total = action.payload.total;
        });
        builder.addCase(fetchChangePerfumeFav.fulfilled, (state, {payload}) => {
            const {updatedCard, wasLiked} = payload;
            state.perfumes = state.perfumes.map(e => e._id === updatedCard?._id ? updatedCard : e);
            if (wasLiked) {
                state.favorites = state.favorites.filter(f => f._id !== updatedCard._id)
            } else {
                state.favorites = [...state.favorites, updatedCard];
            }
        });
        builder.addCase(searchPerfumeByQuery.fulfilled, (state, {payload}) => {
            state.perfumes = filteredCards(payload);
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

export const { sortedPerfumes } = perfumesSlice.actions;

export default perfumesSlice.reducer;

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {findNews, findNewsByCategory, findNewsDetail} from "../api/newsAPI";

const initialState = {
    value: null,
    values: null,
    loading: false,
    error: null,
    success: false,
};
export const getHomePageNews = createAsyncThunk("news/list", async ({ page, pageSize }) => {
    const response = await findNews(page,pageSize);
    return response.data;
});

export const getNewsDetail = createAsyncThunk("news/detail", async (id) => {
    const response = await findNewsDetail(id);
    return response.data;
});

export const getNewsByCategoryId = createAsyncThunk("newsByCategory/list", async ({id, page, pageSize }) => {
    const response = await findNewsByCategory(id,page,pageSize);
    return response.data;
});

export const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        setLoadingNews: (state, action) => {
            state.loading = action.payload;
        },
        setErrorNews: (state, action) => {
            state.error = action.payload;
        },
        setSuccessNews: (state, action) => {
            state.success = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHomePageNews.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getHomePageNews.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getHomePageNews.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.error = false;
                state.values = action.payload;
            })
            .addCase(getNewsDetail.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getNewsDetail.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getNewsDetail.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.error = false;
                state.values = action.payload;
            })
            .addCase(getNewsByCategoryId.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getNewsByCategoryId.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getNewsByCategoryId.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.error = false;
                state.values = action.payload;
            })
    },
});

export const {
    setLoadingNews,
} = newsSlice.actions;

export const selectLoadingNews = (state) => state.news.loading;
export const selectNewsList = (state) => state.news.values
export const selectNewsDetail = (state) => state.news.values

//Enhancement feature of news slice
export const setLoadingTrueIfCalled = (isCalled) => (dispatch, getState) => {
    const currentValue = selectLoadingNews(getState());
    if (currentValue === isCalled) {
        dispatch(setLoadingNews(true));
    }
};

export default newsSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {findCategories} from "../api/categoryAPI";

const initialState = {
    value: null,
    values: null,
    loading: false,
    error: null,
    success: false,
};
export const getCategories = createAsyncThunk("category/list", async () => {
    const response = await findCategories();
    return response.data;
});
export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setLoadingCategories: (state, action) => {
            state.loading = action.payload;
        },
        setErrorCategories: (state, action) => {
            state.error = action.payload;
        },
        setSuccessCategories: (state, action) => {
            state.success = action.payload;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.error = false;
                state.values = action.payload;
            })
    },
});

export const {
    setLoadingCategories,
    setSelectedCategory,
} = categorySlice.actions;

export const selectLoadingCategories = (state) => state.category.loading;
export const selectSuccessCategories = (state) => state.category.success;
export const selectCategoryList = (state) => state.category.values;

export const selectSelectedCategory = (state) => state.category.selectedCategory;


//Enhancement feature of category slice
export const setLoadingTrueIfCalled = (isCalled) => (dispatch, getState) => {
    const currentValue = selectLoadingCategories(getState());
    if (currentValue === isCalled) {
        dispatch(setLoadingCategories(true));
    }
};

export default categorySlice.reducer;
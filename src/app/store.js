import {applyMiddleware, compose, configureStore} from '@reduxjs/toolkit';
import categoryReducer from "../features/categorySlice"
import newsReducer from "../features/newsSlice"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        news: newsReducer,
    },
},composeEnhancers(applyMiddleware()));
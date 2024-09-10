import { configureStore } from "@reduxjs/toolkit";
import paginationSlice from "./paginationSlice";
import movieSlice from "./movieSlice";


const store = configureStore({
    reducer:{
        paginationState:paginationSlice.reducer,
        moviesState:movieSlice.reducer,   
    },
    devTools: process.env.NODE_ENV !== 'production',  
});

export default store;
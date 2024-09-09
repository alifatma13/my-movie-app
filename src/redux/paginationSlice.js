import {createSlice} from '@reduxjs/toolkit';

const paginationSlice = createSlice({
    name:"paginationSlice",
    initialState:{
        pageNumber:1
    },
    reducers:{
        handleNext:(state)=>{
            state.pageNumber += 1;
        },
        handlePrev:(state)=>{
            if (state.pageNumber > 1)
                state.pageNumber -= 1;
        }
    }
})

export default paginationSlice;
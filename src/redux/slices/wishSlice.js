import { createSlice } from "@reduxjs/toolkit";

export const wishSlice = createSlice({
    name: "wish",
    initialState: {

    },
    reducers: {
        getAllWishItems: (state, action) => {
            // console.log("checking in reducer", action)
            state.initialState=action.payload
        }
    }
})

export const { getAllWishItems } = wishSlice.actions

export default wishSlice.reducer;
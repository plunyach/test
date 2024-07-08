import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {

    },
    reducers: {
        getAllCartItems: (state, action) => {
            // console.log("checking in reducer", action)
            state.initialState=action.payload
        }
    }
})

export const { getAllCartItems } = cartSlice.actions

export default cartSlice.reducer;
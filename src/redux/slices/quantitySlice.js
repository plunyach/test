import { createSlice } from "@reduxjs/toolkit";

export const quantitySlice = createSlice({
    name: "cart",
    initialState: {

    },
    reducers: {
        getQuantityItems: (state, action) => {
            // console.log("checking in reducer", action)
            state.initialState=action.payload
        }
    }
})

export const { getQuantityItems } = quantitySlice.actions

export default quantitySlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
    name: "config",
    initialState: {

    },
    reducers: {
        getConfig: (state, action) => {
            // console.log("checking in reducer", action)
            state.initialState=action.payload
        }
    }
})

export const { getConfig } = configSlice.actions

export default configSlice.reducer;
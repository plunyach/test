import { createSlice } from "@reduxjs/toolkit";

// Define the slice
export const currentupdatefun = createSlice({
    name: "currentupdatefun", 
    initialState: {
        wishlistdata: "", 
        addtocartupdate:false,
    },
    reducers: {
        setwishlistdata: (state, action) => {
            state.wishlistdata = action.payload;
        },
        setaddtocartupdate:(state,action)=>{
            state.addtocartupdate=action.payload;
        }
    }
})

export const { setwishlistdata ,setaddtocartupdate} = currentupdatefun.actions;

export default currentupdatefun.reducer;

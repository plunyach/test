import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import wishSlice from './slices/wishSlice'
import quantitySlice from './slices/quantitySlice'
import configSlice from './slices/configSlice'
import CurrentUpdateFun from './slices/CurrentUpdateFun'

export const store = configureStore({
  reducer: {
    cartSlice,
    wishSlice,
    quantitySlice,
    configSlice,
    currentupdatefun: CurrentUpdateFun,
  },
})

// import { configureStore } from '@reduxjs/toolkit'

// import rootReducer from './reducers/rootReducer'
// const initial_store = {}
// const store = configureStore(rootReducer, initial_store)

// export default store
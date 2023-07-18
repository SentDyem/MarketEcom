const {configureStore} = require('@reduxjs/toolkit')

import ProductReducer from './slices/ProductsSlice'
import CartReducer from './slices/CartSlice'
import AddressReducer from './slices/AddressSlice'
export const store = configureStore({
    reducer: {
        product: ProductReducer,
        cart: CartReducer,
        address: AddressReducer,

    }
})
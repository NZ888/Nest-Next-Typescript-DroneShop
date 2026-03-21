import {configureStore} from "@reduxjs/toolkit"
import {authApi} from "@/store/redux-toolkit/slices/auth/auth.slice";
import {cartSlice} from "./slices/cart/cart.slice"
export const store = configureStore({
    reducer: {
        [authApi.reducerPath] : authApi.reducer,
        cartSlice: cartSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
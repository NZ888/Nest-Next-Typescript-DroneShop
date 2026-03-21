import {configureStore, combineReducers} from "@reduxjs/toolkit"
import {authApi} from "@/store/redux-toolkit/slices/auth/auth.slice";
import {cartSlice} from "./slices/cart/cart.slice"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    cartReducer: cartSlice.reducer,
    [authApi.reducerPath] : authApi.reducer
})

const persistConfig = {
    key:'root',
    storage: storage,
    whitelist:["cartReducer"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(authApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
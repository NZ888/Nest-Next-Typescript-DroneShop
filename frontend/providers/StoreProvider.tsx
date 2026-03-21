"use client";

import {Provider} from "react-redux"
import {store, persistor} from "@/store/redux-toolkit/store"
import {PersistGate} from "redux-persist/integration/react"
import {ReactNode} from "react";

export default function StoreProvider(
    {children}:{children: ReactNode;}
) {
    return(

    <Provider store={store}>
        <PersistGate persistor={persistor}>
        {children}
        </PersistGate>
    </Provider>

    )
}
import {fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {API} from "@/config/api";
import {authApi} from "@/store/redux-toolkit/slices/auth/auth.slice";
import {Mutex} from "async-mutex";
const mutext = new Mutex()

const rawBaseQuery = fetchBaseQuery({
    baseUrl: API.baseUrl,
    credentials: "include"
})

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    await mutext.waitForUnlock()
    let result = await rawBaseQuery(args, api, extraOptions)
    if(result.error?.status === 401){
        if(!mutext.isLocked()){
            const release = await mutext.acquire();
            try {
                const refreshResult = await  rawBaseQuery({
                    url: "/auth/refresh",
                    method: "POST"
                }, api, extraOptions)

                if(refreshResult.data){
                    result = await rawBaseQuery(args, api, extraOptions)
                }
            } finally {
                release()
            }
        }
        else {
            await mutext.waitForUnlock()
            api.dispatch(authApi.util.invalidateTags(["Me"]));
        }
    }
    return result
}
import {IUser} from "@/types/user";
import { createApi } from '@reduxjs/toolkit/query/react'
import {baseQueryWithReauth} from "@/store/redux-toolkit/others/fetchAuthBaseQuery";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Me"],
    endpoints: (builder) => ({
        getMe: builder.query<IUser, void>({
            query: () => ({
                url: "auth/me",
                method: "GET"
            }),
            providesTags: ["Me"]
        }),
        login: builder.mutation<void, {email: string; password: string}>({
            query: (body)=>({
                url: "auth/login",
                method: "POST",
                body
            }),
            invalidatesTags: ["Me"]
        }),

    })
})
export const {useGetMeQuery} = authApi

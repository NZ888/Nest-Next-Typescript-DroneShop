
import { refresh } from "@/features/auth/services/auth.service"

let refreshPromise: Promise<void> | null = null;
export async function authFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>{
    let response = await fetch(input, {
        ...init,
        credentials: "include",
    });

    if(response.status !== 401 || String(input).includes("auth/refresh")){
        return response;
    }
    if(!refreshPromise){
        refreshPromise = refresh().then(()=>{}).finally(()=>{
            refreshPromise = null;
        })
    }

    await refreshPromise;

    return fetch(input, {
        ...init,
        credentials: "include",
    })
}
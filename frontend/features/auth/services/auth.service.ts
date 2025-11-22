import {API} from "@/config/api"

export const sendResetCode = async (email: string) => {
    const res = await fetch(API.routes.auth.sendResetCode, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email})
    })
    if(!res.ok){
        const error = await res.json().catch(()=>({}))
        throw new Error(error?.message || "Something went wrong")
    }
    return res.json()
}

export const verifyResetCode = async (email: string, code: string) => {
    const res = await fetch(API.routes.auth.verifyResetCode, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, code})
    })
    if(!res.ok){
        const error = await res.json().catch(()=>({}))
        throw new Error(error?.message || "Something went wrong")
    }
    return res.json()
}

export const resetPassword = async (resetToken: string, newPassword: string) => {
    const res = await fetch(API.routes.auth.resetPassword, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({resetToken, newPassword})
    })
    if(!res.ok){
        const error = await res.json().catch(()=>({}))
        throw new Error(error?.message || "Something went wrong")
    }
    return res.json()
}
import {env} from "./env"

export const API = {
    baseUrl: env.NEXT_PUBLIC_BACKEND_URL,

    routes: {
        products:"/products",
        auth:{
            login:"auth/login",
            register:"auth/register",
            sendResetCode: "auth/send-reset-code",
            verifyResetCode: "auth/verify-reset-code",
            resetPassword: "auth/reset-password",
        }
    }
}
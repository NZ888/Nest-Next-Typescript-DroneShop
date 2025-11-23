import { env } from "./env";

export const API = {
    baseUrl: env.NEXT_PUBLIC_BACKEND_URL,

    routes: {
        products: `${env.NEXT_PUBLIC_BACKEND_URL}/products`,

        auth: {
            login: `${env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
            register: `${env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
            sendResetCode: `${env.NEXT_PUBLIC_BACKEND_URL}/auth/send-reset-code`,
            verifyResetCode: `${env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-reset-code`,
            resetPassword: `${env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`,
        },
    },
};

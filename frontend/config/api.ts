import { env } from "./env";

export const API = {
    baseUrl: env.NEXT_PUBLIC_BACKEND_URL,

    routes: {
        products: {
            allProducts: `${env.NEXT_PUBLIC_BACKEND_URL}/products`,
            getSomeNewProducts: (quantity: number) => `${env.NEXT_PUBLIC_BACKEND_URL}/products/new?quantity=${quantity}`,
            getProduct: (slug: string) => `${env.NEXT_PUBLIC_BACKEND_URL}/products/${slug}` ,
        },

        auth: {
            login: `${env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
            refresh: `${env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
            logout:`${env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
            me: `${env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,


            register: `${env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
            sendEmailConfirmCode: `${env.NEXT_PUBLIC_BACKEND_URL}/auth/send-email-confirm-code`,
            verifyEmailConfirmCode: `${env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-email-confirm-code`,

            sendResetCode: `${env.NEXT_PUBLIC_BACKEND_URL}/auth/send-reset-code`,
            verifyResetCode: `${env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-reset-code`,
            resetPassword: `${env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`,
        },
    },
};

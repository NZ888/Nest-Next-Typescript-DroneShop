import { apiUrl } from "@/lib/helpers";

export const API = {
    baseUrl: apiUrl(""),

    routes: {
        products: {
            allProducts: (page?: number, limit?: number) =>
                apiUrl(`/products?page=${page}&limit=${limit}`),

            getSomeNewProducts: (quantity: number) =>
                apiUrl(`/products/new?quantity=${quantity}`),

            getProduct: (slug: string) =>
                apiUrl(`/products/${slug}`),

            getProductsByCategorySlug: (cSlug: string, page?: number, limit?: number) =>
                apiUrl(`/products/byCategories/?page=${page}&limit=${limit}&categorySlug=${cSlug}`),

            category: {
                CRUD: {
                    createCategory: apiUrl(`/products/categories`),
                    deleteCategory: (slug: string) =>
                        apiUrl(`/products/categories/${slug}`),
                    getAll: apiUrl(`/products/categories`),
                },

                setCategories: (slug: string) =>
                    apiUrl(`/products/${slug}/categories`),

                addCategoriesToExists: (slug: string) =>
                    apiUrl(`/products/${slug}/categories`),

                getAllCategories: apiUrl(`/products/categories`),
            },
        },

        user: {
            getUserInfo: (userId: string | undefined) =>
                apiUrl(`/user/info/${userId}`),
        },

        auth: {
            login: apiUrl(`/auth/login`),
            refresh: apiUrl(`/auth/refresh`),
            logout: apiUrl(`/auth/logout`),
            me: apiUrl(`/auth/me`),

            register: apiUrl(`/auth/register`),
            sendEmailConfirmCode: apiUrl(`/auth/send-email-confirm-code`),
            verifyEmailConfirmCode: apiUrl(`/auth/verify-email-confirm-code`),

            sendResetCode: apiUrl(`/auth/send-reset-code`),
            verifyResetCode: apiUrl(`/auth/verify-reset-code`),
            resetPassword: apiUrl(`/auth/reset-password`),
        },

        feedback: {
            sendFeedback: apiUrl(`/feedback/send`),
            getFeedbacks: apiUrl(`/feedback/get`),
        },
    },
};
import { z } from "zod";

const isURL = (val: string) => {
    try {
        new URL(val);
        return true;
    } catch {
        return false;
    }
};

const envSchema = z.object({
    NEXT_PUBLIC_BACKEND_URL: z.string().refine(isURL, "Invalid BACKEND URL"),
    NEXT_PUBLIC_BACKEND_DOC_URL: z.string().refine(isURL, "Invalid DOC URL"),
    NEXT_PUBLIC_RENDER_NEW_PRODUCT_QUANTITY: z.coerce.number(),
});

export const env = envSchema.parse({
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_BACKEND_DOC_URL: process.env.NEXT_PUBLIC_BACKEND_DOC_URL,
    NEXT_PUBLIC_RENDER_NEW_PRODUCT_QUANTITY: process.env.NEXT_PUBLIC_RENDER_NEW_PRODUCT_QUANTITY,
});

import {z} from "zod"

const envSchema = z.object({
    NEXT_PUBLIC_BACKEND_URL: z.string().url(),
    NEXT_PUBLIC_BACKEND_DOC_URL: z.string().url()
})

export const env = envSchema.parse({
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_BACKEND_DOC_URL: process.env.NEXT_PUBLIC_BACKEND_DOC_URL

})
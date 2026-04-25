import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        NEXTAUTH_URL: z.string().url().optional(),
        NEXTAUTH_SECRET: z.string().min(1)
    },
    client: {
        BACKEND_URL: z.string().url().optional(),
    },
    runtimeEnv: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        BACKEND_URL: process.env.BACKEND_URL,
    }
})
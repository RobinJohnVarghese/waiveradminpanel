import * as z from "zod";


export const userSchema = z.object({
    id: z.string().optional(),
    fullname: z.string(),
    email: z.string().email(),
    referral_code: z.string().optional(),
    phone: z.string(),
    location: z.string(),
    is_active: z.boolean().optional(),
    status: z.string().optional(),
});

export type UserFormData = z.infer<typeof userSchema>;

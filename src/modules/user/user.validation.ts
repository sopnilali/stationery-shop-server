import { z } from "zod";

const createUserValidationSchema = z.object({
    name: z.string(),
    email: z.string(),
    photoURL: z.string(),
    password: z.string({
        invalid_type_error: 'Password must be string',
    })
        .max(20, { message: 'Password can not be more than 20 characters' })
        .optional(),
    role: z.string().optional(),
    isBlocked: z.boolean().optional(),

});

export const authValidationSchema = {
    createUserValidationSchema
}
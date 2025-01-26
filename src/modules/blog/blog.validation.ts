import { z } from "zod";

const createblogContentValidationSchema = z.object({
    title: z.string(),
    content: z.string(),
    author: z.string(),
    isPublished: z.boolean().optional(),

  });

  const updateblogContentValidationSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    author: z.string().optional(),
    isPublished: z.boolean().optional(),

  });  

export const blogContentValidationSchema = {
    createblogContentValidationSchema,
    updateblogContentValidationSchema

}
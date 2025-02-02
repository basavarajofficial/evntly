import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});


export const eventFormSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
    location: z.string().min(3),
    type: z.enum(['online', 'offline']),
    image: z.string().optional(),

})

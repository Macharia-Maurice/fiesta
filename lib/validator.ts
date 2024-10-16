import * as z from 'zod';

export const EventFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long'),
    description: z.string().min(3, 'Description must be at least 10 characters long').max(500, 'Description must be at most 500 characters long'),
    location: z.string().min(3, 'Location must be at least 3 characters long').max(100, 'Location must be at most 100 characters long'),
    startDateTime: z.date(),
    endDateTime: z.date(),
    imageUrl: z.string().url(),
    categoryId: z.string(),
    price:z.string(),
    isFree: z.boolean(),
    url: z.string().url(),
});
 
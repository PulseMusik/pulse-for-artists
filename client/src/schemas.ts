import z from 'zod'

export const ProfileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    country: z.string().optional(),
    phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number").optional(),
    bio: z.string().max(500, "Bio must be 500 characters or less").optional(),
    isActive: z.boolean().default(true),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
    isVerified: z.boolean().default(false),
});

export const AlbumSchema = z.object({
    title: z.string().min(1, "Title is required"),
    releaseDate: z.date().optional(),
    coverImageUrl: z.string().url("Invalid URL").optional(),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
});

export const SongSchema = z.object({
    title: z.string().min(1, "Title is required"),
    duration: z.number().positive("Duration must be a positive number"),
    releaseId: z.string().optional(),
    genre: z.string().optional(),
    releaseDate: z.date().optional(),
    audioUrl: z.string().url("Invalid URL"),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
});

export const LiveEventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().max(1000, "Description must be 1000 characters or less").optional(),
    dateTime: z.date(),
    venue: z.string().min(1, "Venue is required"),
    bookingWebsites: z.array(
        z.object({
            name: z.string().min(1, "Website name is required"),
            url: z.string().url("Invalid URL"),
        })
    ).optional(),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
});
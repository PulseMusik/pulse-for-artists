import Joi from 'joi';

export const ProfileSchema = Joi.object({
    displayName: Joi.string().min(1).max(30).required(),
    username: Joi.string().min(1).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(255).required(),
    bio: Joi.string().max(1000).optional(),
    phoneNumber: Joi.string().required(),
});

export const AlbumSchema = Joi.object({
    title: Joi.string().min(1).required().messages({ 'string.empty': 'Title is required' }),
    releaseDate: Joi.date().optional(),
    coverImageUrl: Joi.string().uri().optional().messages({ 'string.uri': 'Invalid URL' }),
    createdAt: Joi.date().default(() => new Date()),
    updatedAt: Joi.date().default(() => new Date()),
});

export const SongSchema = Joi.object({
    title: Joi.string().min(1).required().messages({ 'string.empty': 'Title is required' }),
    duration: Joi.number().positive().required().messages({ 'number.positive': 'Duration must be a positive number' }),
    releaseId: Joi.string().optional(),
    genre: Joi.string().optional(),
    releaseDate: Joi.date().optional(),
    audioUrl: Joi.string().uri().required().messages({ 'string.uri': 'Invalid URL' }),
    createdAt: Joi.date().default(() => new Date()),
    updatedAt: Joi.date().default(() => new Date()),
});

export const LiveEventSchema = Joi.object({
    title: Joi.string().min(1).required().messages({ 'string.empty': 'Title is required' }),
    description: Joi.string().max(1000).optional().messages({ 'string.max': 'Description must be 1000 characters or less' }),
    dateTime: Joi.date().required(),
    venue: Joi.string().min(1).required().messages({ 'string.empty': 'Venue is required' }),
    bookingWebsites: Joi.array().items(
        Joi.object({
            name: Joi.string().min(1).required().messages({ 'string.empty': 'Website name is required' }),
            url: Joi.string().uri().required().messages({ 'string.uri': 'Invalid URL' }),
        })
    ).optional(),
    createdAt: Joi.date().default(() => new Date()),
    updatedAt: Joi.date().default(() => new Date()),
});
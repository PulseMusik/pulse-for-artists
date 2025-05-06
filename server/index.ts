import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

import dotenv from 'dotenv'
dotenv.config({ path: '../.env' });

import artistRoutes from './src/routes/artistRoutes'

import cors from 'cors'

import mongoose from 'mongoose';

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}))

app.use('/artist', artistRoutes)

mongoose.connect(process.env.DB_URI as string).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err: Error) => {
    console.error('Failed to connect to MongoDB:', err.message);
});

mongoose.connection.on('error', (err: Error) => {
    console.error('MongoDB error:', err.message);
});
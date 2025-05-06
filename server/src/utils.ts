import { string } from 'joi'
import { v4 as uuidv4 } from 'uuid'

import crypto from 'crypto'

import jwt from 'jsonwebtoken'

import mongoose from 'mongoose'

import { ncrypt } from 'ncrypt-js'

import dotenv from 'dotenv'
dotenv.config({ path: '../.env' });

const { encrypt, decrypt } = new ncrypt(process.env.JWT_TOKEN as string)

export function generateSessionKey(userId: string) {
    const id = uuidv4().concat(uuidv4())

    return `${userId}:${id}`
}

export const generateJWT = (token: string, id: string) => {
    if (!token) {
        throw new Error('Token not passed.')
    }

    const payload = {
        jti: uuidv4(),
        token: token,
        id: id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3 * 24 * 60 * 60
    }

    return jwt.sign(payload, process.env.JWT_TOKEN as string, { algorithm: 'HS256' })
}

export async function dbConn() {
    try {
        const connection = await mongoose.connect(process.env.DB_URI!);
        console.log('MongoDB connected');
        return connection.connection;
    } catch (e) {
        console.error('Error connecting to MongoDB', e);
        throw e;
    }
}

export function encryptData(data: string, secretKey: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
}

export function decryptData(encryptedData: string, secretKey: string): string {
    const iv = Buffer.from(encryptedData.slice(0, 32), 'hex');
    const encryptedText = encryptedData.slice(32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export function encryptSensitive(data: string) {
    const data1 = encrypt(data)
    const data2 = encrypt(data1)
    const data3 = encrypt(data2)

    return data3;
}

export function decryptSensitive(data: string) {
    const data1 = decrypt(data)
    const data2 = decrypt(data1.toString())
    const data3 = decrypt(data2.toString())

    return data3;
}
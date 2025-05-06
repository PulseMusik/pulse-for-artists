import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid'
import { decryptSensitive, encryptSensitive, generateSessionKey } from "../utils";
import { generateJWT } from "../utils";

import SimpleCrypto from 'simple-crypto-js'

import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'

import { ProfileSchema } from "../models/schemas";

import Artist from '../models/Artist'

import { encryptData } from "../utils";

import Cookies from "js-cookie";

import validator from 'validator'

export async function createUser(req: Request, res: Response) {
    try {
        const id = uuidv4()

        let { error, value } = await ProfileSchema.validate(req.body);

        if (error) {
            return res.status(400).send({
                message: 'Invalid input data.',
                errorCode: 'INVALID_INPUT',
                details: error.details
            });
        }

        const existingUser = await Artist.findOne({
            $or: [
                { username: value.username },
                { displayName: value.displayName }
            ]
        })

        if (existingUser) {
            return res.status(400).send({
                message: 'Username or display name already taken.',
                errorCode: 'USER_EXISTS'
            })
        }

        const data = {
            userId: id,
            username: value.username,
            password: await bcrypt.hash(value.password, 14),
            displayName: value.displayName,
            email: await encryptSensitive(value.email),
            phoneNumber: await encryptSensitive(value.phoneNumber),
            bio: value.bio,
        }

        const newArtist = new Artist(data)

        await newArtist.save()

        const token = await generateSessionKey(id)
        const cookie = await generateJWT(token, id)

        res.cookie('.ARTISTSECURITY', cookie, {
            httpOnly: true,
            sameSite: 'none',
            secure: false,
            path: '/'
        })

        res.status(200).send({ message: 'User created successfully' })
    } catch (e: any) {
        if (e.name === 'MongoError') {
            return res.status(500).send({ message: "Something went wrong, please try again later." })
        }

        if (e.message.includes('JWT')) {
            return res.status(500).send({ message: 'Failed to generate authentication token.' })
        }

        return res.status(500).send({ message: 'Something went wrong, please try again later.' })
    }
}

export async function generateArtistId(req: Request, res: Response) {
    try {
        const id = uuidv4()

        res.status(200).send({ data: { id: id } })
    } catch (e: any) {
        console.error(e)
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        let data = req.body

        console.log(req.body)

        if (!data) {
            return res.status(400).send({ message: 'Username and/or password not provided.', errorCode: 'BAD_REQUEST' })
        }

        data.username = validator.escape(data.username);
        data.password = validator.escape(data.password);
        8
        const existingArtist = await Artist.findOne({
            $or: [
                { username: data.username },
            ]
        });

        if (!existingArtist) {
            return res.status(404).send({ message: 'Artist not found', errorCode: 'ARTIST_NOT_FOUND' })
        }

        const isPasswordCorrect = await bcrypt.compare(data.password, existingArtist.password)

        if (!isPasswordCorrect) {
            return res.status(401).send({ message: 'Password or username is not correct.', errorCode: 'INCORRECT_PASSWORD' })
        }

        const token = await generateSessionKey(existingArtist.userId)
        const cookie = await generateJWT(token, existingArtist.userId)

        res.cookie('.ARTISTSECURITY', cookie, {
            httpOnly: true,
            sameSite: 'none',
            secure: false,
            path: '/'
        })

        res.status(200).send({ message: "User logged in." })
    } catch (e) { console.error(e); res.status(500).send({ message: "An unknown error occurred." }) }
}
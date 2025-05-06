const express = require('express');
const router = express.Router()

const artistController = require('../controllers/artistController')

router.post('/create', artistController.createUser)

router.post('/login', artistController.loginUser)

router.get('/generate_id', artistController.generateArtistId)

export default router
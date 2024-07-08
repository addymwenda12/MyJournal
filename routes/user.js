const express = require('express');
const router = express.Router();
const { createProfile, getProfile, updateProfile } = require('../controllers/user');
const verifyToken = require('../middleware/auth');

router.put('/profile', verifyToken, createProfile, getProfile, updateProfile)

module.exports = { userRoutes: router };
import { Router } from 'express';
const router = Router();
import { createProfile, getProfile, updateProfile } from '../controllers/user.js';
import verifyToken from '../middleware/auth.js';

router.put('/profile', verifyToken, createProfile, getProfile, updateProfile)

export const userRoutes = router;
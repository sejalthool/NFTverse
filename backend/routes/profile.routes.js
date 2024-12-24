import express from 'express';
import { getProfile, updateProfile } from '../controllers/profile.controller.js';

const router = express.Router();

router.get('/:address', getProfile);
router.put('/:address', updateProfile);

export default router; 
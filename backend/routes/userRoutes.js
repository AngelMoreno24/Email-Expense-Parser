import express from 'express';
import { getUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUser);

export default router;
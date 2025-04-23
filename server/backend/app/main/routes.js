import express from 'express';
const router = express.Router();
import { serverMainPAge } from './controller.js';

router.get('/', serverMainPAge);

export default router;
import express from 'express';
import {getChat, postChatLine } from './controller.js';

const router = express.Router();

router.get('/:user', getChat);
router.post('/:user', postChatLine);


export default router;
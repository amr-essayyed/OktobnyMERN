import express from 'express';

import {serverProfilePage} from './controller.js';
import {authorizeMW} from '../auth/controller.js';

// instantiate a sub-server (router) to be connected to the corresponding endpoint of the server
const router = express.Router();

router.get('/', authorizeMW, serverProfilePage);

export default router; // Export router
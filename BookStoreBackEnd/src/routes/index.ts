import  * as express from 'express';

import {router as bookController} from '../controller/bookController';
import {router as customerController} from '../controller/customerController';
import {router as orderController} from '../controller/orderController';

export const router = express.Router();

router.use('/api', bookController);
router.use('/api', customerController);
router.use('/api', orderController);

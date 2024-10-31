import express from 'express';
import { addTimeEntry, getTimeEntryByClient   } from '../controller/timeentry';

const router = express.Router();


router.post('/', addTimeEntry);
router.get('/:clientId', getTimeEntryByClient);




export default router;

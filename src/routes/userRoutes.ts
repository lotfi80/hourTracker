import express from 'express';
import { addClient, getClient } from '../controller/client';

const router = express.Router();


router.get('/:userid/clients', getClient);
router.post('/:id/addclient', addClient);




// router.post('/user', getUser);
// router.get('/client', getClient)


export default router;


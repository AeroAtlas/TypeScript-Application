import { Router } from 'express';

const router = Router(); //to use middleware

router.post('/');

router.get('/');

router.patch('/:id');

router.delete('/:id');

export default router;
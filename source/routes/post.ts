import express from 'express';
import controller from '../controllers/post';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/:id', extractJWT, controller.getPost);
router.post('/', extractJWT, controller.createPosts);
router.get('/all', extractJWT, controller.getAllPosts);

export = router;

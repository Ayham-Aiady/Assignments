import express from 'express';
import { createPost, deletePost, editPost, getPost, getPosts, rePost } from '../src/controllers/usersController.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', createPost);
router.put('/:id', editPost);
router.patch('/:id', rePost);
router.delete('/:id', deletePost);

export default router;


// router.get('/',getUsers);
// router.get('/createUser',createUser);
// router.get('/update/:id',updateUsers);
// router.get('/deleteUser',deleteUser);
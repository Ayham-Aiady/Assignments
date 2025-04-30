
import express from 'express';

const router = express.Router();
const posts = [];

router.get('/', (req, res) => {
  res.render('home', { posts });
});

router.get('/posts/new', (req, res) => {
  res.render('new');
});

router.post('/posts', (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: Date.now(), title, content });
  res.redirect('/');
});

router.get('/posts/:id/edit', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.redirect('/');
  res.render('edit', { post });
});

router.post('/posts/:id/edit', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
  }
  res.redirect('/');
});

router.post('/posts/:id/delete', (req, res) => {
  const index = posts.findIndex(p => p.id == req.params.id);
  if (index !== -1) posts.splice(index, 1);
  res.redirect('/');
});

export default router;

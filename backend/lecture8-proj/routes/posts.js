import express from 'express';

const router = express.Router();


let posts = [
  { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
  { id: 2, title: 'Second Post', content: 'Here is the content for the second post.' }
];


router.get('/', (req, res) => {
  res.render('home', { posts });
});



router.get('/new', (req, res) => {
  res.render('new');
});


router.post('/', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.redirect('/posts');
});


router.get('/:id/edit', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.redirect('/posts');
  res.render('edit', { post });
});


router.post('/:id/edit', (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.redirect('/posts');

  post.title = title;
  post.content = content;

  res.redirect('/posts');
});


router.post('/:id/delete', (req, res) => {
  posts = posts.filter(post => post.id !== parseInt(req.params.id));
  res.redirect('/posts');
});

export default router;

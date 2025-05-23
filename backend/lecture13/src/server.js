import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import router from '../routes/usersRoutes.js';
import pool from './config/db.js'; // ✅ correct from inside src/

dotenv.config();
const app = express();

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.send('Hello from the backend!');
// });

 app.use('/posts',router);



app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts');
    res.render('index.ejs', { posts: result.rows });
  } catch (error) {
    console.error('Error fetching posts:', error); // 👈 logs the full error
    res.status(500).send('Error loading posts');
  }
});



app.listen(process.env.PORT,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
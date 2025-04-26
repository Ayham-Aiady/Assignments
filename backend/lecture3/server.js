import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === 'programming') {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

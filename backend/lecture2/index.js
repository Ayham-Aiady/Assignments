import express from 'express';
import bodyParser from 'body-parser';
import {dirname} from "path";
import { fileURLToPath } from 'url';

const __dirname =dirname(fileURLToPath(import.meta.url));
const app = express();
const port=3000;
let userInfo ={
    email:null,
    password:null,
};


app.use(bodyParser.urlencoded({extended:true}))


function saveToDb(req,res,next){
(userInfo.email=req.body.email),(userInfo.password=req.body.password);
next();
}


app.use(saveToDb);


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
  });
  app.post('/submint',(req,res)=>{
    console.log(req.body);
    res.send(`<h1>your email ${userInfo.email} and password ${userInfo.password}</h1>`);
  })

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about', (req, res) => {
    res.send('Hello ,about');
  });

  app.get('/login', (req, res) => {
    res.send(`
        <form>
        <input type="email"
         name="Email" 
         id="Email" 
         placeholder="please enter your Email" 
         required>
         <input type="password"
         name="Password" 
         id="Password" 
         placeholder="please enter your Password" 
         required
         minlength="8"
        ></form>
        `
    );
  });
  app.patch('/test', (req, res) => {
    res.sendStatus(200);
  });

app.listen(port, () => {
  console.log('Server running on http://localhost:3000');
});

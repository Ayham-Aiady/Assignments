import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { ADDRCONFIG } from 'dns';

const app = express();
const port = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    const today=new Date();
    const seconds = today.getSeconds();



res.render("index.ejs",{
   
    seconds:seconds,
});

});


app.post("/submit",(req,res)=>{
   const name =req.body.name;
   res.render("index.ejs",{
name:name,

     });
   
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
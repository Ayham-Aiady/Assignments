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
    res.sendFile(__dirname + "/public/index.html")
});


app.post("/submit",(req,res)=>{
   const name =req.body.name;
   res.render("index.ejs",{
name:name,
cart:["item1","item2","item3"],
content:"fffffffffffffffffffffffff",
     });
   
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  
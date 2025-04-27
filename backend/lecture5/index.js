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
const day=today.getDay();
let type="a weekday";
let adv= "time to work";

if(day===5 || day===6){
    type="the weekend";
    adv="time for fun";
}
res.render("index.ejs",{
    type:type,
    adv:adv,
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
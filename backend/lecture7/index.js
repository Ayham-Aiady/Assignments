import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.get('/favicon.ico', (req, res) => res.status(204).end());

// let random = Math.floor(Math.random()*11);

app.get("/", (req, res) => {
   
    res.render("index",{randomName:null,randomName2:null}); 
});

// app.get("/about",(req,res)=>{
//     res.render("about.ejs");
// });
// app.get("/contact",(req,res)=>{
//     res.render("contact.ejs");
// });
app.post("/submit", (req, res) => {
    const randomName = name1[Math.floor(Math.random() * name1.length)];
    const randomName2=lastName[Math.floor(Math.random() * lastName.length)];
    res.render("index",{
        randomName:randomName,
        randomName2:randomName2,
    }); 
});
const name1 =[
"Tariq",
"Noor ",
"Zayd ",
"Leen ",
"Amir ",
]
const lastName=[
' Al-Omari',

 'Al-Hassan',

'Al-Khatib',

'Al-Jundi',

 'Al-Amin',
]

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  
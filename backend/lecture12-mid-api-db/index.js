import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;
const api_url="http://localhost:4000"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());




  app.get("/",async (req,res)=>{
try{
const response = await axios.get(`${api_url}/users`);

res.render("index.ejs",{users:response.data});
}catch(error){
res.status(500).json({error:error});
}
});

app.get("/create-user",(req,res)=>{
res.render("index.ejs",{
    heading:"create new user",
    submit:"create user",
});
});


app.post('/api/users', async (req, res) => {
  console.log("Received from form:", req.body); 

  try {
    const response = await axios.post(`${api_url}/users`, {
      email: req.body.email,
      name: req.body.name,
      phonenumber: req.body.phonenumber,
      address: req.body.address,
      gender: req.body.gender,
    });

    res.redirect('/');
  } catch (error) {
    console.error("Error posting to API:", error.response?.data || error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


    
app.listen(port, () => {
    console.log('Server running at http://localhost:3000');
  });

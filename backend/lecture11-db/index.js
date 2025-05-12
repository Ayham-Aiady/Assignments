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
const response = await axios.get(`${api_url}/posts`);

res.render("index.ejs",{posts:response.data});
}catch(error){
res.status(500).json({error:error});
}
});

app.get("/create-post",(req,res)=>{
res.render("edit.ejs",{
    heading:"create new post",
    submit:"create post",
});
});

app.get("/edit-post/:id",async (req,res)=>{
    const id = req.params.id;
   try{
    const response = await axios.get(`${api_url}/posts/${id}`);
    console.log(response.data)
    res.render('edit.ejs',{
        heading:"Edit post",
    submit:"Edit post",
    post:response.data,
    });
   }catch(error){
    res.status(500).json({message:"internal server error",error:error});
   }
    });
    

    app.post('/api/posts',async (req,res)=>{
       
        try{
         const response = await axios.post(`${api_url}/posts`,{
            title:req.body.title,
            content:req.body.content,
            author:req.body.author,
         });
        res.redirect("/");
        }catch(error){
         res.status(500).json({message:"internal server error",error:error});
        }
    });


    app.post('/api/posts/:id',async (req,res)=>{
        const id = req.params.id;
        try{
         const response = await axios.patch(`${api_url}/posts/${id}`,req.body);

        res.redirect("/");
        }catch(error){
         res.status(500).json({message:"internal server error",error:error});
        }
    });

    // app.post('/api/posts/:id',async (req,res)=>{
    //     const id = req.params.id;
    //     try{
    //      const response = await axios.patch(`${api_url}/posts/${id}`,req.body);
         
    //     res.redirect("/");
    //     }catch(error){
    //      res.status(500).json({message:"internal server error",error:error});
    //     }
    // });

    app.get('/api/posts/delete/:id',async (req,res)=>{
        try{
             const id = req.params.id;
            const response = await axios.delete(`${api_url}/posts/${id}`);
           res.redirect("/");
           }catch(error){
            res.status(500).json({message:"internal server error",error:error});
           }
    })


app.listen(port, () => {
    console.log('Server running at http://localhost:3000');
  });

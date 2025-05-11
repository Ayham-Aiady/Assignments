import express from 'express';
import bodyParser from 'body-parser';
// import pg from 'pg';
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// const db = new pg.Client({
//     user:"postgres",
//     host:"localhost",
//     database:"blog",

// })



let posts = [
    {
        id:1,
        title:"jomayka",
        content:"kabab res that sells the sandwish in 1 jd",
        author:"ayham xd",
        date:"2025-05-09",

    },
    {
        id:2,
        title:"jomayka",
        content:"kabab res that sells the sandwish in 1 jd",
        author:"ayham xd",
        date:"2025-05-09",
    },
    {
        id:3,
        title:"jomayka",
        content:"kabab res that sells the sandwish in 1 jd",
        author:"ayham xd",
        date:"2025-05-09",
    },
 
];

let lastId=3;

app.get("/posts",(req,res)=>{
    res.json(posts);
});

app.get("/posts/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=>post.id===id);
    if(post)
    res.json(post);

    res.status(404).json({error:"post not found"});
});


app.post("/posts",(req,res)=>{
    lastId++;
    const newPost = {
        id:lastId,
        title:req.body.title,
        content:req.body.content,
        author:req.body.author,
        date:new Date(),
    }
    posts.push(newPost);

    res.status(201).json(newPost);
});


app.patch("/posts/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const postIndex = posts.findIndex((post)=>post.id===id);
    const postObj=posts[postIndex];
    const updatePost = {
        id:id,
        title:req.body.title || postObj.title,
        content:req.body.content || postObj.content,
        author:req.body.author || postObj.author,
        date:postObj.date,
    };
    
    posts[postIndex]=updatePost;

    res.status(200).json(updatePost);
});

app.put("/posts/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const postIndex = posts.findIndex((post)=>post.id===id);
   if(postIndex>-1){
    const updatePost = {
        id:id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date:new Date(),
    };
    
    posts[postIndex]=updatePost;

    res.status(200).json(updatePost);
   }else{
    res.status(404).json({error:"post not found"});
   }
    
});


app.delete("/posts/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const postIndex= posts.findIndex((post)=> post.id===id);
    if(postIndex>-1){
        posts.splice(postIndex,1);
        res.sendStatus(200);
    }else{
        res.status(404).json({error:`post ${id} not found `});
    }
});


app.listen(port, () => {
    console.log('Server running at API http://localhost:4000');
  });
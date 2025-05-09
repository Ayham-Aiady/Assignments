import express from 'express';
import bodyParser from 'body-parser';
import https from 'https';
import axios from 'axios';
import { error } from 'console';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

let colors=[
    {
        id:1,
        color:"red",
        value:"#f00", 
    },
    { id:2,
        color:"green",
        value:"#0f0", 
    },
    { id:3,
        color:"magenta",
        value:"#f0f",
    },
    { id:4,
        color:"yellow",
        value:"#ff0", 
    },
    { id:5,
        color:"black",
        value:"#000", 
    },
    { id:6,
        color:"cyan",
        value:"#0ff", 
    }
]


app.get("/colors",(req,res)=>{
res.json(colors);
});


app.get("/random",(req,res)=>{
    const randomColor = Math.floor(Math.random() * colors.length);
    res.json(colors[randomColor]);
    });

    app.get("/colors/:id",(req,res)=>{
        const id = parseInt(req.params.id);
        const colorObj = colors.find((color) => color.id===id);
        res.json(colorObj);
        });

        app.get("/filter",(req,res)=>{
            const colorQ = req.query.color;
            const listOfFilterColors = colors.filter((color)=>color.color===colorQ);

            res.json(listOfFilterColors);
            });
            
app.post("/colors",(req,res)=>{
    const newColor={
        id:colors.length + 1,
        color: req.body.color,
        value:req.body.value,
    };
    colors.push(newColor);
                res.status(200).json(newColor);
                });            
        
                app.put("/colors/:id",(req,res)=>{
                    const id = parseInt(req.params.id);
                    const updateColor = {
                        id:id,
                        color:req.body.color,
                        value:req.body.value,
                    };
                    const colorIndex=colors.findIndex((color)=>color.id===id);

                    colors[colorIndex]=updateColor;
                    res.json(updateColor);
                    });

                    app.patch("/colors/:id",(req,res)=>{
                        const id = parseInt(req.params.id);
                        const colorIndex=colors.findIndex((color)=>color.id===id);
                        const colorObj= colors[colorIndex];
                        
                        const updateColor = {
                            id:id,
                            color:req.body.color || colorObj.color,
                            value:req.body.value || colorObj.value,
                        };
                        
    
                        colors[colorIndex]=updateColor;
                        res.json(updateColor);
                        });       
                        app.delete("/colors/:id",(req,res)=>{
                            const id = parseInt(req.params.id);
                            const colorIndex=colors.findIndex((color)=>color.id===id);

                            if(colorIndex>-1){
                                colors.splice(colorIndex,1);
                                res.sendStatus(200);
                            }else{
                                res.status(404).json({error:`Color id ${id} not found`});
                            }
                        });
                        app.delete("/all",(req,res)=>{
                           colors=[];
                           res.sendStatus(200);
                        });
                        

                        

// app.get("/",async (req,res)=>{

// try{
//      const response=await axios.get("https://api.wheretheiss.at/v1/satellites/25544");
//      res.render("index.ejs",response.data);
// }catch(error){
//     console.log("failed to make request",error.message);
//     res.status(500).send("failed to fetch data");
// }
// });


// app.get("/colors",(req,res)=>{
// res.json(JSON.parse(colors));
// });
// app.get("/color/:id",(req,res)=>{
//     res.json(JSON.parse(colors));
//     });




//   app.get("/",(req,res)=>{


//     const request=https.get("https://api.wheretheiss.at/v1/satellites/25544",(response)=>{
//         let data="";
//         response.on("data",(chunk)=>{
//             data+=chunk;
//         });

//     response.on("end",()=>{
//         try{
//             const result = JSON.parse(data);
//             res.render("index.ejs",(result));

//         }catch (error){
// console.log("res error");
// res.status(500).send("failed to fetch data");
//         }
//     });

//     });
// });


app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });



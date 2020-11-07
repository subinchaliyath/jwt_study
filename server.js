require('dotenv').config()
const express= require("express");
const jwt= require("jsonwebtoken");

const app = express();
app.use(express.json())

const posts=[
    {
        username:"subin",
        title:"post 1"
    },
    {
        username:"hari",
        title:"post 2"
    }
]
app.get("/post",authToken,(req,res)=>{
    res.json(posts.filter((post)=>{post.username===req.user.name}))
})
app.post("/login",(req,res)=>{
    //authenticate
    const username=req.body.username;
    const user={name:username}
   const accessToken= jwt.sign(user,process.env.ACCESS_TOKEN)
   res.json({accessToken})
})

function authToken(req,res,next){
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1];
    if(token==null){
        return res.sendStatus(401)
    }
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user=user
        next()
    })
}

app.listen(3000,()=>console.log("on 3000"))

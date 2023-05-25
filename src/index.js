const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection=require("./mongodb")
const PORT = process.env.PORT || 3030; //https://www.freecodecamp.org/news/how-to-deploy-nodejs-application-with-render/
const templatePath=path.join(__dirname,'../templates')

// Specify the path to the public directory
const publicPath = path.join(__dirname, "../public"); 


app.use(express.json())
app.set("view engine","hbs")
app.set("views", templatePath)
app.use(express.urlencoded({extended:false}))
//serve css
app.use(express.static(publicPath));

app.get("/", (req,res)=>{
    res.render("login");
})

app.get("/signup", (req,res)=>{
    res.render("signup");
})

app.post("/signup",async (req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password
    }

    await collection.insertMany([data])

    res.render("home")
})

app.post("/login",async (req,res)=>{

    try{
        const check=await collection.findOne({name:req.body.name})
        if(check.password===req.body.password){
            res.render("home");
        }
        else{
            res.send("Password is incorrect")
        }
    }
    catch{
        res.send("Username or password does not exist")
    }
    
})

app.listen(PORT, ()=>{
    console.log("server started on ${PORT}");
})
const express = require("express")
const session = require("express-session");
const path = require("path")
const hbs = require("hbs")
const collection=require("./mongodb")


const app = express()


//const PORT = process.env.PORT || 3030; //https://www.freecodecamp.org/news/how-to-deploy-nodejs-application-with-render/
const PORT = 3000; //port for local testing
const templatePath=path.join(__dirname,'../templates')

// Specify the path to the public directory
const publicPath = path.join(__dirname, "../public"); 

// Configure session middleware
app.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: false,
    })
  );

  
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

app.post("/login", async (req, res) => {
    try {
      const check = await collection.findOne({ name: req.body.name });
      if (check) {
        if (check.password === req.body.password) {
          // Store user data in session
          req.session.user = check;
  
          res.redirect("/home");
        } else {
          res.send("Password is incorrect");
        }
      } else {
        res.send("Username or password does not exist");
      }
    } catch (error) {
      res.send("An error occurred");
    }
  });

// Home route with authentication check
app.get("/home", (req, res) => {
    if (req.session.user) {
      res.render("home");
    } else {
      res.redirect("/");
    }
  });
  

app.get("/logout", (req, res) => {
// Destroy the session to log out the user
req.session.destroy((err) => {
    if (err) {
        console.log(err);
    }
        res.redirect("/");
    });
});
    
app.listen(PORT, ()=>{
    console.log(`server started on ${PORT}`);
})
const mongoose=require("mongoose")

//mongoose.connect("mongodb://localhost:27017/logintutorialexampledb", {
mongoose.connect("mongodb+srv://dinukadangampala:WnU&-UxU#?n448M@cluster0.2ybzcsx.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect to mongodb");
})

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model("Collection1", LogInSchema)

module.exports=collection
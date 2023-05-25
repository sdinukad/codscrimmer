require("dotenv").config(); // Load environment variables from .env file

const mongoose = require("mongoose");

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

// Replace <your-atlas-connection-string> with the connection string from MongoDB Atlas
const uri = `mongodb+srv://${username}:${encodeURIComponent(password)}@cluster0.2ybzcsx.mongodb.net/test?retryWrites=true&w=majority`;


mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB:", error);
  });

const LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = mongoose.model("Collection1", LogInSchema);

module.exports = collection;

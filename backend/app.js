const express = require("express"); // imports the Express framework,
const cors = require("cors"); //imports cors
const mongoose = require("mongoose"); // imports Mongoose, which is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const userRoutes = require("./routes/userRoute");

const app = express(); //creates an instance of the Express application
const port = 3000; //port number that the server will listen

//enable CORS
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "CORS enabled!" });
});

//mongoDB Connection
async function connectDb() {
  try {
    await mongoose.connect("mongodb://localhost:27017", { dbName: "userdb" });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
connectDb();
//mongoDB connection end

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const express = require("express")
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const Order = require("../models/orders") 
const Store = require("../models/store")

mongoose.set('strictQuery',false);
const PORT = 3122

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

if (process.env.NODE_ENV !== "production" ) {
    require("dotenv").config();
} 

const CONNECTION = process.env.CONNECTION;


app.post('/orders', async (req, res) => {
   try {
     const items = req.body; // Expecting an array of items in the request body
     const savedItems = await Order.insertMany(items);
     res.status(201).json(savedItems);
   } catch (error) {
     res.status(400).json({ message: error.message });
   }
 });

 app.post('/additem', async (req, res) => {
   try {
    const itemData = req.body; // Data from client (Postman)
    const newItem = new Store(itemData); // Create Mongoose document
    const savedItem = await newItem.save(); // Save to database
     res.status(201).json(savedItem);
   } catch (error) {
     res.status(400).json({ message: error.message });
   }
 });

 app.get("/api/store", async (req, res)=>{
   const data = await Store.find()
   try {
       res.json(data);
   } catch (error) {
      res.status(404).json({error: error.message}) 
   }
})


const start = async() => {
    try {
    await mongoose.connect(CONNECTION, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });
 
    app.listen( PORT, ()=>{
       console.log("app listening on port " + PORT + " and database connection is a sucess");
    });
    } catch (error) {
       console.log(error.message);  
    };
 };
 
 start();
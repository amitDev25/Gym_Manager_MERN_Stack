const express = require("express")
require('dotenv').config()
const workoutRoutes = require("./routes/workouts")
const mongoose = require('mongoose')


const app = express()

//Middleware

app.use(express.json())

app.use((req, res, next)=>{
    console.log(req.path, req.method);
    next()
    
})

//Routes
app.use("/api/workouts", workoutRoutes)

app.get("/", (req, res)=>{
    res.send("Hello World")
})

//DB Connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Database is Connected & App is running on port ", process.env.PORT);
        
    })    
})
.catch((error)=>{
    console.log(error);
    
})


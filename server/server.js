import express from 'express';  // import express
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import workoutsRouter from './routes/workouts.js';//import the workouts router

dotenv.config();
const app = express();// Create an express app

//middleware
app.use(express.json());//parse json bodies
/*
app.use(express.json()); is middleware that parses incoming requests with JSON payloads. This line of code ensures that the body of incoming requests is parsed as JSON, making the parsed data available in req.body.

all the data will be passed onto req object so we can we it in the route handlers
*/


app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
    
})


//react to a get request on the root url
//this is a route
// app.get('/',(req,res)=>{
//     res.json({message: 'Hello World!'});//send a json response
// })

app.use('/api/workouts',workoutsRouter);//use the workouts router for all requests to /workouts

//connect to db
mongoose.connect(process.env.MONGO_URI).then(()=>{//connect to the database
    console.log('Connected to the database');
    app.listen( process.env.PORT, ()=>{//listen for requests on port 4000
    console.log(`Server is running on port ${process.env.PORT}`);
})
}).catch((error)=>{ 
    console.log('Error connecting to the database',error.message);
});



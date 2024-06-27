import express from 'express';  // import express
const router = express.Router(); // this creates an insatnce of the express router then use it to define routes

import {createWorkout,getAllWorkouts,getSingleWorkout,deleteWorkout,updateWorkout} from '../controllers/workoutController.js';//import the createWorkout function from the workouts controller

/*
router.get('/',(req,res), router.post,router.put,router.delete)=>{//this is a route
*/


//GET all workouts
router.get('/',getAllWorkouts);

//GET single workout
router.get('/:id',getSingleWorkout);//this is a route
//:id represents a route parameter


//POST a workout
router.post('/',createWorkout);

//DELETE a workout
router.delete('/:id',deleteWorkout);

//UPDATE a workout
router.patch('/:id',updateWorkout);



export default router;
// export the router to be used in the server.js file
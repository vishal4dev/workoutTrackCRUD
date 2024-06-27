import WorkoutModels from '../models/WorkoutModels.js';
import mongoose from 'mongoose';

//get all workouts
const getAllWorkouts = async(req,res)=>{
    try {
        const workouts = await WorkoutModels.find({}).sort({createdAt:-1});//find all the workouts

        res.status(200).json(workouts);

    } catch (error) {
        res.status(404).json({message: error.message});
    }
};



//get single workout

const getSingleWorkout = async(req,res)=>{
    const {id} = req.params ;//destructure the id from the request parameters
    
    //check if the id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({message: 'Invalid workout id'});//check if the id is valid
    }

    const workout = await WorkoutModels.findById(id);//find the workout by id

    if(!workout){
        res.status(404).json({message: 'Workout not found'});
    }

    res.status(200).json(workout);
}


//create a workout

const createWorkout = async(req,res)=>{
    const {title, load, reps} = req.body;//destructure the request body
    
    let emptyFields = []
    if(!title){
        emptyFields.push('title');
    }
    if(!load){
        emptyFields.push('load');
    }
    if(!reps){
        emptyFields.push('reps');
    }
    if(emptyFields.length > 0){
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })

    }
    //add data to the database
    try {
        const workout = await WorkoutModels.create({title, load, reps});

        res.status(200).json(workout);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

//delete a workout

const deleteWorkout = async(req,res)=>{
    
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({message: 'Invalid workout id'});//check if the id is valid
    }

    const workout = await WorkoutModels.findOneAndDelete({_id:id});
    //This correction properly constructs the query object with _id as the key and id (extracted from req.params) as the value, allowing Mongoose to correctly identify and delete the document with the matching _id.

    if(!workout){
        return res.status(404).json({message: 'Workout not found'});
    }

    res.status(200).json(workout);

}


//update a workout

const updateWorkout = async(req,res)=>{
    
    const {id} =req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({message: 'Invalid workout id'});//check if the id is valid
    }

    const workout = await WorkoutModels.findOneAndUpdate({_id:id},{
       ...req.body 
    })

    //{_id:id}: This is the search criteria object. The method will look for a document in the collection where the _id field matches the value of the id variable.

    //{...req.body}: This is the update object. The spread operator (...) is used to copy all properties from req.body into this new object. req.body typically contains the new data for the document, received from the client in the body of an HTTP request. 

    if(!workout){
        return res.status(404).json({message: 'Workout not found'});
    }

    res.status(200).json(workout);

}



export {createWorkout, getAllWorkouts, getSingleWorkout, deleteWorkout, updateWorkout};

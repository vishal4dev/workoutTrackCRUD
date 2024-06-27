import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const workoutSchema = new Schema({

    title:{
        type: String,
        required: true,
    },
    reps:{
        type: Number,
        required: true,
    },
    
    load:{
        type: Number,
        required: true,
    },
    
},{timestamps: true});//timestamps will automatically add createdAt and updatedAt fields


export default mongoose.model('WorkoutModels', workoutSchema);

//here Workout is a model and workoutSchema is a schema
//model is a class with which we construct documents


// Creating functions for different routes
const Workout = require("../models/WorkoutModel")
const mongoose = require('mongoose')

//Create a workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body

    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill all the fields", emptyFields})
    }
    try {
        const workout = await Workout.create({ title, reps, load })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })

    }

}

//Get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}

// Get Single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Workout is not found" })
    }

    const workout = await Workout.findById({ _id: id })

    if (!workout) {
        return res.status(404).json({ error: "Workout is not found" })
    }
    res.status(200).json(workout)

}

//Delete a workout

const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Workout is not found" })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) {
        return res.status(404).json({ error: "Workout is not found" })
    }
    res.status(200).json(workout)

}

//Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Workout is not found" })
    }
    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({ error: "Workout is not found" })
    }
    res.status(200).json(workout)

}




module.exports = {
    createWorkout, getWorkouts, getSingleWorkout, deleteWorkout,updateWorkout
}

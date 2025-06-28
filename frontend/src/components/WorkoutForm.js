import React from 'react'
import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'


const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const workout = { title, load, reps }
        const response = await fetch('/api/workouts', {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': "application/json"
            }
        })

        const json = await response.json()

        if(response.ok){
            setError(null)
            setTitle("")
            setReps("")
            setLoad("")
            setEmptyFields([])
            
            console.log("Workout created : ", json)
            dispatch({type: "CREATE_WORKOUT", payload: json})
        }
        else{
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

    }

    return (
        <div>
            <form className="create" onSubmit={handleSubmit}>
                <h3>Add New Workout</h3>
                <label>Exercise Title: </label>
                <input className={emptyFields.includes('title') ? 'error': ''} type="text" onChange={(e) => { setTitle(e.target.value) }} value={title} />

                <label>Load: </label>
                <input className={emptyFields.includes('load') ? 'error': ''} type="number" onChange={(e) => { setLoad(e.target.value) }} value={load} />

                <label>Reps: </label>
                <input className={emptyFields.includes('reps') ? 'error': ''} type="number" onChange={(e) => { setReps(e.target.value) }} value={reps} />

                <button>Add Workout</button>
                {error && <div className="error">{error}</div> }
            </form>

        </div>
    )
}

export default WorkoutForm

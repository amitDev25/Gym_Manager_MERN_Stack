import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({item}) => {
  const {dispatch} = useWorkoutsContext()

  const handleClick = async()=>{
    const response = await fetch(`/api/workouts/${item._id}`, {method: "DELETE"})
    const json = await response.json()

    if(response.ok){
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }
  return (
    <div className='workout-details'>
        <h4>{item.title}</h4>
        <p><strong>Load : </strong>{item.load}</p>
        <p><strong>Reps : </strong>{item.reps}</p>
        <p>{formatDistanceToNow(new Date(item.createdAt), {addSuffix: true})}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>

      
    </div>
  )
}

export default WorkoutDetails

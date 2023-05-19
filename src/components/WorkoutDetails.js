import { useDispatch, useSelector } from 'react-redux'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { deleteWorkout } from '../features/workout/workoutSlice'

const WorkoutDetails = ({ workout }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.user)
    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        // const json = await response.json()

        if (response.ok) {
            dispatch(deleteWorkout(workout))
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Number of reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={(handleClick)}>delete</span>
        </div>
    )
}

export default WorkoutDetails
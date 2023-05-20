import { useDispatch, useSelector } from 'react-redux'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { updateWorkout, deleteWorkout } from '../features/workout/workoutSlice'
import { useState } from 'react'

const WorkoutDetails = ({ workout }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.user)

    const [updateForm, setUpdateForm] = useState(false)
    const toggleUpdatePopup = () => {
        setUpdateForm(!updateForm)
    }

    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleClickDelete = async () => {
        if (!user) {
            return
        }
        const deleteResponse = await fetch('https://workoutapi-fjcr.onrender.com/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        // const json = await deleteResponse.json()

        if (deleteResponse.ok) {
            dispatch(deleteWorkout(workout))
        }

    }

    const handleClickUpdate = async (e) => {
        e.preventDefault()
        if (!load || !reps) {
            setError('Please fill in all fields')
            return
        }
        const updateResponse = await fetch('https://workoutapi-fjcr.onrender.com/api/workouts/' + workout._id, {
            method: 'PATCH',
            body: JSON.stringify({ load, reps }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const getResponse = await fetch('https://workoutapi-fjcr.onrender.com/api/workouts/' + workout._id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await updateResponse.json()
        const js = await getResponse.json()
        if (!updateResponse.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (updateResponse.ok) {
            setEmptyFields([])
            setError(null)
            setLoad('')
            setReps('')
            dispatch(updateWorkout(js))
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Number of reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.updatedAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={(handleClickDelete)}>delete</span>
            {!updateForm && <input
                type="button"
                value="Update Workout"
                onClick={toggleUpdatePopup}
            />
            }
            {updateForm && <div>
                <form className="create" onSubmit={handleClickUpdate}>
                    <label>Load (in kg):</label>
                    <input
                        type="number"
                        onChange={(e) => setLoad(e.target.value)}
                        value={load}
                        className={emptyFields.includes('load') ? 'error' : ''}
                    />

                    <label>Number of Reps:</label>
                    <input
                        type="number"
                        onChange={(e) => setReps(e.target.value)}
                        value={reps}
                        className={emptyFields.includes('reps') ? 'error' : ''}
                    />
                    <button type="submit">Update</button>
                    <span className="close" onClick={toggleUpdatePopup} >Close form</span>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
            }
        </div>
    )
}

export default WorkoutDetails
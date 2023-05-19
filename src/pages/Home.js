import { useSelector } from "react-redux"

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
    const { workouts, isLoading } = useSelector((store) => store.workout)

    if (isLoading) {
        return (
            <header>
                <div className="container">
                    <h1>Loading...</h1>
                </div>
            </header>

        )
    }
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map(workout => (
                    < WorkoutDetails workout={workout} key={workout._id} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home
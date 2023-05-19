import { configureStore } from '@reduxjs/toolkit'
import workoutReducer from './features/workout/workoutSlice'
import userReducer from './features/user/authSlice'

export const store = configureStore({
    reducer: {
        workout: workoutReducer,
        user: userReducer
    }
})
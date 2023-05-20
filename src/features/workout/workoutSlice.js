import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const url = 'https://workoutapi-fjcr.onrender.com/api/workouts'

const initialState = {
    workouts: null,
    isLoading: false,

}

export const getWorkouts = createAsyncThunk(
    'workout/getWorkouts',
    async (token, thunkAPI) => {
        try {
            const resp = await axios(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong')
        }
    }
)


const workoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        createWorkout: (state, action) => {
            state.workouts = [action.payload, ...state.workouts]
        },
        deleteWorkout: (state, action) => {
            state.workouts = state.workouts.filter((w) => w._id !== action.payload._id)
        },
        updateWorkout: (state, action) => {
            state.workouts = state.workouts.filter((w) => w._id !== action.payload._id)
            state.workouts = [action.payload, ...state.workouts]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWorkouts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getWorkouts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.workouts = action.payload;
            })
            .addCase(getWorkouts.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            });
    },
})

export const { createWorkout, deleteWorkout, updateWorkout } = workoutSlice.actions

export default workoutSlice.reducer
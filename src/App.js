import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getWorkouts } from './features/workout/workoutSlice'
import { loginUser } from './features/user/authSlice'

function App() {

  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.user)

  useEffect(() => {
    if (user) {
      dispatch(getWorkouts(user.token))
    }
  }, [dispatch, user])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch(loginUser(user))
    }
  }, [dispatch])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

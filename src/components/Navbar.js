import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../features/user/authSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.user)
  const handleClick = () => {
    //remove user from browser storage
    localStorage.removeItem('user')

    //dispatch logout action
    dispatch(logoutUser())
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}

        </nav>
      </div>
    </header>
  )
}

export default Navbar
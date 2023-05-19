import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginUser } from "../features/user/authSlice"

const Signup = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = { email, password }

        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        }
        if (response.ok) {
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            setIsLoading(false)
            setError(null)
            setEmail('')
            setPassword('')
            //update state
            dispatch(loginUser(json))
        }

    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup
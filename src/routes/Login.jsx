import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../components/Auth";
import {Button, TextField} from "@mui/material";
import SnackBar from "../components/SnackBar";

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)

	const navigate = useNavigate()
	const location = useLocation()
	const auth = useAuth()

	const from = location.state?.from || "/"

	const handleSubmit = async (e) => {
		e.preventDefault()
		const err = await auth.login({username, password}, () => navigate(from, {replace: true}))
		if (err) {
			setError(err)

		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<TextField label="Username" variant="outlined" id="username" type="text" value={username}
			           onChange={event => setUsername(event.target.value)}/>
			<TextField label="Password" variant="outlined" id="password" type="password" value={password}
			           onChange={event => setPassword(event.target.value)}/>
			<Button variant="contained" type="submit">Login</Button>
			{error && <SnackBar message={error}/>}
		</form>
	)
}

export default Login;

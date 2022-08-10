import {useAuth} from "./components/Auth";
import {useEffect} from "react";
import {HashRouter, Route, Routes} from 'react-router-dom'
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import NavBar from "./components/NavBar";
import Main from "./components/Main";

const App = () => {
	const auth = useAuth()

	useEffect(() => {
		if (!auth?.user) {
			const data = JSON.parse(localStorage.getItem('user'))
			if (data) {
				auth.loginFromLocalStorage(data)
			}
		}
	}, [auth])

	return (
		<HashRouter>
			<NavBar/>
			<Routes>
				<Route path="/" element={<Main/>}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/signup" element={<Signup/>}/>
			</Routes>
		</HashRouter>
	);
}

export default App;

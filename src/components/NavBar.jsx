import {AppBar, Box, Button, Container} from "@mui/material";
import {Link} from "react-router-dom";
import {useAuth} from "./Auth";

const NavBar = () => {
	const auth = useAuth()
	const isLoggedIn = auth?.user
		? <Button variant="outlined" style={{color: "white"}} color="error" onClick={() => auth.logout()}>Logout</Button>
		: <>
			<Button variant="outlined"><Link to='/login'>Login</Link></Button>
			<Button variant="outlined"><Link to='/signup'>Signup</Link></Button>
		</>
	return (
		<AppBar position="static">
			<Container maxWidth="x1">
				<Box sx={{flexGrow: 1, display: {xs: "flex", md: "none", justifyContent: "flex-end"}}}>
					{isLoggedIn}
				</Box>
			</Container>
		</AppBar>
	)
}

export default NavBar

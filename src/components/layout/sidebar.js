import React, {useState} from 'react';
import { Button } from '@mui/material';
// import { InputWithIcon } from './textfield';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import Box from "@mui/material/Box";
import { auth } from '../../services/user-services'
import { useAuth } from '../../hooks/useAuth';
import {Link} from "react-router-dom";
import User from "../user/user";
import {useNavigate} from "react-router-dom";

function Sidebar(){
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const { AuthD, setAuth } = useAuth();
     const history = useNavigate();
    const Handler = async e => {
        e.preventDefault();
        const data = await auth({username, password});
        setAuth(data);
    }
    const logout = () => {
        setAuth(null);
    }
    const account = () => {
        history('/account');
    }
    return(
        <div className="sidebar">
            {!AuthD ?
            <div>
			<form onSubmit={Handler}>
                <Box sx={{'& > :not(style)': {m: 1}}}>
                    <TextField
                        id="username"
                        label="UserName"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle color="primary"/>
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        onChange={e => setUsername(e.target.value)}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type={"password"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PasswordIcon color="primary"/>
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        onChange={e => setPassword(e.target.value)}
                    />
                </Box>
            <Button color="primary" type="submit"	variant="contained" >
                Submit
            </Button>
                <br/>

            </form>
                <Link to={'/register'}>Register Here if you dont have an account yet</Link>
                </div>
            :<div>
                    <User user={AuthD.user}/>
                    <Button color="primary" onClick={() => logout()}	variant="contained" >
                        logout
                    </Button>
                    <Button color="primary" onClick={() => account()}	variant="contained" >
                        My Account
                    </Button>
            </div>}
        </div>
    );
}

export default Sidebar;
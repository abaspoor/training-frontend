import React, {useState,useContext} from 'react';
import { Button } from '@mui/material';
// import { InputWithIcon } from './textfield';
import { auth } from '../services/user-services'
import { useAuth } from '../hooks/useAuth';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import Box from "@mui/material/Box";

 function Sidebar(){
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const { authData, setAuth } = useAuth();
    const Handler = async e =>{
        e.preventDefault();
        const data = await auth({username, password});
        setAuth(data);
        console.log(authData);
    }
    return(
        <div className="sidebar">
            {authData && <p>{authData.token}</p>}
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
            </form>
        </div>
    );
}

export default Sidebar;
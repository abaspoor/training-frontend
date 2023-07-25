import React, {useState} from "react";
import { useAuth } from "../hooks/useAuth";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";
import {Button} from "@mui/material";
import { register } from '../services/user-services'
import {auth} from "../services/user-services";

function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');

    const passMatch = () => {
        return (password === password2);
    }

    const { AuthD, setAuth } = useAuth();
    const Handler = async e => {
        e.preventDefault();
        if(passMatch()){
			const regData = await register({username, email, password, profile:{is_premium: false}})
            if(regData){
                console.log(regData)
            }
        }else{
            console.log('password not match')
        }
    }
    return(
        <div>
            <Link to={'/'}>Back</Link>
            <h1>Register</h1>
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
                    <br/>
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
                    <br/>
                    <TextField
                        id="password2"
                        label="confirm"
                        type={"password"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PasswordIcon color="primary"/>
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        onChange={e => setPassword2(e.target.value)}
                    />
                    <br/>
                    <TextField
                        id="email"
                        label="email"
                        type={"email"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon color="primary"/>
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        onChange={e => setEmail(e.target.value)}
                    />
                </Box>
                <Button color="primary" type="submit"	variant="contained" >
                    Register
                </Button>
            </form>
            <br/>
            <p>Register Here if you dont have an account yet</p>
        </div>
    )
}

export default Register;
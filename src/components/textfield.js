import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import {useState} from "react";



export  function InputWithIcon() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const element = <Box sx={{'& > :not(style)': {m: 1}}}>
        <TextField
            id="username"
            label="UserName"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <AccountCircle/>
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
                        <PasswordIcon/>
                    </InputAdornment>
                ),
            }}
            variant="standard"
            onChange={e => setPassword(e.target.value)}
        />
    </Box>;
    return [username,password,element];
}

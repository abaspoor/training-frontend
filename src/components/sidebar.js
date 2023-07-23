 import React, {useState} from 'react';
import { Button } from '@mui/material';
import { InputWithIcon } from './textfield';
import { auth } from '../services/user-services'
import { useAuth } from "../hooks/useAuth";

 function Sidebar(){
    const [UserName,PassWord, loginField] = InputWithIcon();
    // const { authData, setAuth } = useAuth();
     const [ authData, setAuth ] = useState('');
    const Handler = async e =>{
        e.preventDefault();
        const data = await auth({username: UserName, password:PassWord});
        setAuth(data);
    }
    return(
        <div className="sidebar">
            {authData && <p>{authData.token}</p>}
			<form onSubmit={Handler}>
                {loginField}
            <Button color="primary" variant="contained" type='submit'>
                Submit
            </Button>
            </form>
        </div>
    );
}

export default Sidebar;
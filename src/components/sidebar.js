import React, {useState,useContext} from 'react';
import { Button } from '@mui/material';
import { InputWithIcon } from './textfield';
import { auth } from '../services/user-services'
import { useAuth } from '../hooks/useAuth';

 function Sidebar(){
    const [UserName,PassWord, loginField] = InputWithIcon();
    const { authData, setAuth } = useAuth();
    const Handler = async e =>{
        e.preventDefault();
        const data = await auth({username: UserName, password:PassWord});
        setAuth(data);
        console.log(authData);
    }
    return(
        <div className="sidebar">
            {authData && <p>{authData.token}</p>}
			<form onSubmit={Handler}>
                {loginField}
            <Button color="primary" type="submit"	variant="contained" >
                Submit
            </Button>
            </form>
        </div>
    );
}

export default Sidebar;
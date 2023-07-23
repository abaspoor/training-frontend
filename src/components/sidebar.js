 import React, {useState} from 'react';
import { Button } from '@mui/material';
import { InputWithIcon } from './textfield';



function Sidebar(){
    const [UserName,PassWord, Element] = InputWithIcon();
    const Handler = async e =>{
        e.preventDefault();
        console.log(UserName,PassWord);
    }
    return(
        <div className="sidebar">
			<form onSubmit={Handler}>
                {Element}
            <Button color="primary" variant="contained" type='submit'>
                Submit
            </Button>
            </form>
        </div>
    );
}

export default Sidebar;
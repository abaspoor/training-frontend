import React, {useState} from 'react';
import {Avatar} from "@mui/material";
import {StyleAvatar} from "../react-classes";

function User({user}){
    const classes = StyleAvatar();
    return(
        <div className={classes.container}>
            <Avatar alt="Remy Sharp" src={"http://127.0.0.1:8000/"+user.profile.image} alt="user avatar" height="100"/>
            <h4 className={classes.username}>{user.username}</h4>
        </div>
    );
}

export default User;
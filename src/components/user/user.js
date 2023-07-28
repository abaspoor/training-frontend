import React from 'react';
import {Avatar} from "@mui/material";
import {StyleAvatar} from "../react-classes";
import PropTypes from "prop-types";

export default function User({user}){
    const classes = StyleAvatar();
    return(
        <div className={classes.container}>
            <Avatar alt="Remy Sharp" src={"http://127.0.0.1:8000/"+user.profile.image} alt="user avatar" height="100"/>
            <h4 className={classes.username}>{user.username}</h4>
        </div>
    );
}

User.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        profile: PropTypes.shape({
            image: PropTypes.string
        }).isRequired
    }).isRequired
}
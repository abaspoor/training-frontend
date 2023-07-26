import React from 'react';
import { Routes , Route } from 'react-router-dom';
import GroupList from "../group/group-list";
import GroupDetails from "../group/group-details";
import { useAuth } from "../../hooks/useAuth";
import Register from "../user/register";
import Account from "../user/account";

function Main(){
    const { AuthD } = useAuth();
    return(
        <div className="main">
            {AuthD && <h3>{AuthD.user.username}</h3>}
            <Routes >
                <Route exact path="/" Component={GroupList}/>
                <Route path="/details/:id" Component={GroupDetails}/>
                <Route path="/register" Component={Register}/>
                <Route path="/account" Component={Account}/>
            </Routes >
        </div>
    );
}

export default Main;
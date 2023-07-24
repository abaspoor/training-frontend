import React from 'react';
import { Routes , Route } from 'react-router-dom';
import GroupList from "./group-list";
import GroupDetails from "./group-details";
import { useAuth } from "../hooks/useAuth";

function Main(){
    const { AuthD } = useAuth();
    return(
        <div className="main">
            {AuthD && <h3>{AuthD.user.username}</h3>}
            <Routes >
                <Route exact path="/" Component={GroupList}/>
                <Route path="/details/:id" Component={GroupDetails}/>
            </Routes >
        </div>
    );
}

export default Main;
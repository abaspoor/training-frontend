import React from 'react';
import { Routes, Route } from 'react-router-dom'
import GroupList from "./group-list";

function Main(){
    return(
        <div className="main">
            <Routes>
                <Route exact path={'/'} element={<GroupList/>}></Route>
                <Route path={'/details/:id'} element={<h1>Details</h1>}></Route>
            </Routes>
        </div>
    );
}

export default Main;
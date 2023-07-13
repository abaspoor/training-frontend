import React from 'react';
import { Routes , Route } from 'react-router-dom';
import GroupList from "./group-list";

function Main(){
    return(
        <div className="main">
            <Routes >
                <Route exact path="/" element={<GroupList/>}/>
                <Route include path="/details" element={<h1>Details</h1>}/>
            </Routes >
        </div>
    );
}

export default Main;
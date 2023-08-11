import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import {useFetchGroups} from "../../hooks/fetch-groups";
import GroupListItem from "./group-list-item";

function GroupList() {

	const [ data , loading , error ] = useFetchGroups();
    const [ groups , setGroups ] = useState(null);
    useEffect(()=>{
		setGroups(data);
    }, [data])

    if(error) return <h1>Error</h1>
    if(loading) return <h1>Loading....</h1>
    return (
        <div>
                { groups && groups.map(group => {
                    return (
                        <GroupListItem group={group}/>)
                })}
        </div>
    );
}

export default GroupList;

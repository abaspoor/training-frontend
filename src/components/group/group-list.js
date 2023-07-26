import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import {useFetchGroups} from "../../hooks/fetch-groups";

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
                        <Link key={group.id} to={`/details/${group.id}`}>
                            <p>"{group.name}" from location : {group.location}</p>
                        </Link>)
                })}
        </div>
    );
}

export default GroupList;

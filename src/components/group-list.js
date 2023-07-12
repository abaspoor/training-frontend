import React, {useState, useEffect} from "react";


function GroupList() {

    const [groups, setGroups] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        const getData = async () => {
            await fetch('http://127.0.0.1:8000/api/groups/')
                .then(resp => resp.json())
                .then(data => {
                    setGroups(data);
                    setLoading(false);
                }).catch(e => {
                    setError(true);
                    setLoading(false);
                })
        }
        getData();
    }, [])

    if(error) return <h1>Error</h1>
    if(loading) return <h1>Loading....</h1>
    return (
        <div>
                { groups && groups.map(group => {
                    return <p key={group.id}>"{group.name}" from location : {group.location}</p>
                })}
        </div>
    );
}

export default GroupList;

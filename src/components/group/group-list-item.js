import React from "react";
import { Link } from 'react-router-dom';

function GroupListItem({group}) {

    return(
        <div>
            {group && <Link key={group.id} to={`/details/${group.id}`} >
                <p>{group.name}: {group.location} & with {group.num_members} members</p>
            </Link>
            }
        </div>
    );
}

export default GroupListItem;

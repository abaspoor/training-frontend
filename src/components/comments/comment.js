import React from 'react';
import User from "../user/user";


function Comment({comments, users}){

    return(
        <div>
			<User user={users}/>
            <p>{comments.description}</p>
        </div>
    )
}

export default Comment;
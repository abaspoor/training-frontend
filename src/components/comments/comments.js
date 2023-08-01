import React from 'react';
import Comment from './comment';
import { makeStyles} from "@mui/styles";


const useStyles = makeStyles({
    container:{
        display:'grid',
        gridTemplateColumns: '1fr 10fr'
    }
})

function Comments({group}){

    const classes = useStyles();

    const getUser = userId => {
        return group.members.find(member => member.user.id === userId).user;
    }

    return(
        <div>
            <hr/>
            <h1>Comments</h1>
    	<div className={classes.container}>
            {group.comments.map( comment => {
                return <Comment comment={comment} user={getUser(comment.user)}/>
            })}
        </div>
        </div>
    )
}

export default Comments;
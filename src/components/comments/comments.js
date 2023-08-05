import React, {useState} from 'react';
import Comment from './comment';
import { makeStyles} from "@mui/styles";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import { postComment } from '../../services/group-services';
import { useAuth } from '../../hooks/useAuth';


const useStyles = makeStyles({
    container:{
        display:'grid',
        gridTemplateColumns: '1fr 3fr'
    }
})

function Comments({group}){

    const { AuthD } = useAuth();
    const classes = useStyles();
    const [newComment, setNewComment] = useState('');
    const getUser = userId => {
        return group.members.find(member => member.user.id === userId).user;
    }
    const sendComment = () => {
        postComment(AuthD.token, newComment, group.id, AuthD.user.id).then( resp => {
            setNewComment('');
            group.comments.unshift(resp);
        });
        console.log(AuthD.user.id);
    }

    return(
        <div>
            <hr/>
            <h1>Comments</h1>
            <TextField
                label="New comment"
                multiline
                fullWidth
                rows={4}
                variant='outlined'
                value={newComment}
                onChange={evt => setNewComment(evt.target.value)}
            />
            <Button onClick={ ()=> sendComment()} disabled={!newComment}
                    variant='content' color='secondary'>Send Comment</Button>
    	<div className={classes.container}>
            {group.comments.map( comment => {
                return <Comment comments={comment} users={getUser(comment.user)}/>
            })}
        </div>
        </div>
    )
}

export default Comments;
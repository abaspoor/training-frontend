import {makeStyles} from "@mui/styles";
import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetchEvent} from "../../hooks/fetch-events";
import {useAuth} from '../../hooks/useAuth';

const useStyle = makeStyles(theme => ({

}))
export default function Event(){
    const {AuthD} = useAuth();
    const {id} = useParams();
    console.log(id);
    const [data,loading,error] = useFetchEvent(AuthD.token,id);
    const [Event,setEvent]= useState();
    const classes = useStyle();
    return(
        <React.Fragment>
            <h3>EVent info Here</h3>
        </React.Fragment>
    )
}
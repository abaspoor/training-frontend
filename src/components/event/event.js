import {makeStyles} from "@mui/styles";
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetchEvent} from "../../hooks/fetch-events";
import {useAuth} from '../../hooks/useAuth';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import {DateTime} from "luxon";

const useStyles = makeStyles(theme => ({
    dateTime:{
        fontSize:'18px',
        marginRight:'3px',
        marginLeft:'10px',
        marginTop:'10px',
        color: theme.colors.mainAccentColor
    },
    memberContainer:{
        display: 'grid',
        gridTemplateColumns: '100px auto',
    }
}));
export default function Event(){
    const {AuthD} = useAuth();
    const {id} = useParams();
    console.log(id);
    const [data,loading,error] = useFetchEvent(AuthD.token,id);
    const [Event,setEvent]= useState();
    const classes = useStyles();
    const [ evtTime, setEvtTime] = useState(null);

    useEffect(()=>{
        setEvent(data);
        if(data?.time){
            const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
            setEvtTime(DateTime.fromFormat(data.time, format));
        }
    }, [data]);
    if(error) return <h1>Error</h1>
    if(loading) return <h1>Loading....</h1>



    return(

        <React.Fragment>
            {Event && evtTime &&
                <div>
                <h3>{Event.team1} vs {Event.team2}</h3>
                <h2>
                <CalendarTodayIcon className={classes.dateTime}/> {evtTime.toSQLDate()}
                <AccessAlarmIcon className={classes.dateTime}/> {evtTime.toFormat('HH:mm')}</h2>
                </div>
            }
        </React.Fragment>
    )
}
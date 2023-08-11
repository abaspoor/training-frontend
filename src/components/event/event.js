import {makeStyles} from "@mui/styles";
import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {useFetchEvent} from "../../hooks/fetch-events";
import {useAuth} from '../../hooks/useAuth';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import {DateTime} from "luxon";
import User from '../user/user';
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import {placeBet, setResults} from "../../services/event-services";
import { useSnackbar } from 'notistack';

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
    },
    bets:{
        display:'grid',
        gridTemplateColumns:'2fr 1fr 1fr',
        margin:'5px 0 0 0'
    }
}));
export default function Event(){
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const {AuthD} = useAuth();
    const {id} = useParams();
    const [data,loading,error] = useFetchEvent(AuthD.token,id);
    const [Event,setEvent]= useState();
    const classes = useStyles();
    const [ evtTime, setEvtTime] = useState(null);
    const [score1, setScore1] = useState(null);
    const [score2, setScore2] = useState(null);
    const [isFuture,setIsFuture]=useState(null);
    const [timeDiff,setTimeDiff]=useState(null);

    useEffect(()=>{
        setEvent(data);
        if(data?.time){
            const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
            const eventTime = DateTime.fromFormat(data.time, format)
            setEvtTime(eventTime);
            const now = DateTime.now();
            setIsFuture(eventTime>now);
            setTimeDiff(eventTime.toRelative());
        }
    }, [data]);
    const sendBet = async () => {
        const bet = await placeBet(AuthD.token, {score1, score2, 'event': Event.id});
        if(bet){
            if(bet.new){
                Event.bets.push(bet.result);
            }else{
                const myBetIndex = Event.bets.findIndex(el => el.user.id === bet.result.user.id);
                Event.bets[myBetIndex] = bet.result;
            }
            enqueueSnackbar(bet.message, {variant:'success',style:{borderRadius:'17px',},anchorOrigin:{
                    vertical:"top",
                    horizontal:"right",
                }});
            setScore1('');
            setScore2('');
        }}
    const setScores = async () => {
        const eventData = await setResults(AuthD.token, {score1, score2, 'event': Event.id});
        if(eventData){
            enqueueSnackbar('Scores has been set', {variant:'success',style:{borderRadius:'17px',},anchorOrigin:{
                        vertical:"top",
                        horizontal:"right",
                    }});
            setEvent(eventData);
            setScore1('');
            setScore2('');
            }
        else {
            enqueueSnackbar('Could not be set', {variant:'error',style:{borderRadius:'17px',},anchorOrigin:{
                    vertical:"top",
                    horizontal:"right",
                }});
        }
        }

    if(error) return <h1>Error</h1>
    if(loading) return <h1>Loading....</h1>

    return(

        <React.Fragment>

            {Event && evtTime &&
                <div>
                    <Link to={`/details/${Event.group}`}>Back</Link>
                <h3>{Event.team1} vs {Event.team2}</h3>
                    {Event.score1>=0 && Event.score2>=0 && <h2>{Event.score1} : {Event.score2}</h2>}
                <h2>
                <CalendarTodayIcon className={classes.dateTime}/> {evtTime.toSQLDate()}
                <AccessAlarmIcon className={classes.dateTime}/> {evtTime.toFormat('HH:mm')}</h2>
                    <h2>{timeDiff}</h2>
                    <h3>Number of people already bet: {Event.number_bets}</h3>
                    <hr/>
                    <br/>
                    {Event && Event.bets && Event.bets.map(bet => {
                    return <div key={bet.id} className={classes.bets}><User user={bet.user}/>
                        <h4>{bet.score1} : {bet.score2}</h4>
                    <h4>{bet.points}PTS</h4></div>
                    })}
                    <hr/>
                    <br/>

                    <br/>
                    {isFuture ?
                        <div>
                            <TextField label="Score 1" type='number' onChange={e=>setScore1(e.target.value)}></TextField>
                            :
                            <TextField label="Score 2" type='number' onChange={e=>setScore2(e.target.value)}></TextField>
                        <Button variant='contained' color='primary' onClick={() => sendBet()} disabled={!score1 || !score2}>Place Bet</Button>
                    </div>
                    :
                        Event.is_admin ?
                            <div><TextField label="Score 1" type='number' onChange={e=>setScore1(e.target.value)}></TextField>
                            :
                            <TextField label="Score 2" type='number' onChange={e=>setScore2(e.target.value)}></TextField>
                                <br/>
                        <Button variant='contained' color='primary' onClick={() => setScores()} disabled={!score1 || !score2}>Set Score</Button>
                            </div>
                            :
                            null
                    }

                </div>
            }
        </React.Fragment>
    )
}
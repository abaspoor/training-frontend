import React, {useState, useEffect} from "react";
import { Link , useParams } from 'react-router-dom';
import { useFetchGroup } from '../../hooks/fetch-groups';
import {DateTime} from 'luxon';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { makeStyles} from "@mui/styles";
import User from '../user/user';


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

function GroupDetails() {
    const classes = useStyles();

    const { id } = useParams();
    const [data , loading , error] = useFetchGroup(id);
	const [ group , setGroup ] = useState(null);

    useEffect(()=>{
		setGroup(data);
    }, [data])

    if(error) return <h1>Error</h1>
    if(loading) return <h1>Loading....</h1>


    return (
        <div>
            <Link to={'/'}>Back</Link>
            { group &&
                <React.Fragment>
                <h1>{group.name} {group.location}</h1>
				<h2>{group.description}</h2>
                    <h3>Events:</h3>
                    {group.events.map (event => {
						const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
                        const evtTime = DateTime.fromFormat(event.time, format);

                        return <div key={event.id}>
                            <p>{event.team1} vs {event.team2}</p>
                            <p><CalendarTodayIcon className={classes.dateTime}/> {evtTime.toSQLDate()}
                                  <AccessAlarmIcon className={classes.dateTime}/> {evtTime.toFormat('HH:mm')}</p>
                        </div>
                    })}
                    <br/>
                    <h3>Members:</h3>
                    {group.members.map (member => {
                        return <div key={member.id} className={classes.memberContainer}>
                            <User user={member.user}/>
                            <p>{member.points} <b> PTS</b></p>
                        </div>
                    })}
                </React.Fragment>

            }
        </div>
    );
}

export default GroupDetails;

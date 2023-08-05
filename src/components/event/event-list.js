import React from "react";
import {DateTime} from "luxon";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";


export default function EventList({events , style}){
    return(
        <React.Fragment>
            <h3>Events:</h3>
            {events && events.map (event => {
                const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
                const evtTime = DateTime.fromFormat(event.time, format);

                return <div key={event.id}>
                    <p>{event.team1} vs {event.team2}
                    :
                    <CalendarTodayIcon className={style.dateTime}/> {evtTime.toSQLDate()}
                        <AccessAlarmIcon className={style.dateTime}/> {evtTime.toFormat('HH:mm')}</p>
                </div>
            })}
			</React.Fragment>
    		)}
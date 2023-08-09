import React,{useState} from "react";
import {useParams,useLocation} from "react-router-dom";
import {CssTextField} from '../layout/element';
import {Button} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";


export default function EventForm(){
	//////////////////////////
    var utc = require('dayjs/plugin/utc')
    var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin

    dayjs.extend(utc)
    dayjs.extend(timezone)

    const timestamp = "2014-06-01 12:00"
    const tz = "Asia/Tehran"
    ////////////////////////////
    const location=useLocation();
    const group = location.state
    const [team1,setTeam1] = useState();
    const [team2,setTeam2] = useState();
    const [time,setTime] = useState();
	const adapter = AdapterDayjs;
    const handleSubmit = async e =>{
        e.preventDefault();
        const dateTime = dayjs(time,'YYYY-MM-DD HH:mm:ss');
        console.log(dateTime.tz(tz).format());
    }

    return(
        <div>
        <h1>new event for a group {group.id}</h1>
            <form onSubmit={handleSubmit}>
        	    <CssTextField label={'Team1'} onChange={e => setTeam1(e.target.value)}></CssTextField>
                <CssTextField label={'Team2'} onChange={e => setTeam2(e.target.value)}></CssTextField>
                <br/>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                    <DateTimePicker onChange={newDate => setTime(newDate)}/>
                </LocalizationProvider>
                <br/>
                <Button type={'submit'} variant={'contained'} color={'primary'} sx={{marginTop:'20px'}}>Create Event</Button>
            </form>
        </div>
            )
}
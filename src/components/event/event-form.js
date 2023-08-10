import React,{useState} from "react";
import {useParams,useLocation} from "react-router-dom";
import {CssTextField} from '../layout/element';
import {Button} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";
import {createEvent} from '../../services/event-services';
import {useAuth} from "../../hooks/useAuth";
import {enqueueSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";


export default function EventForm(){
	//////////////////////////
    var utc = require('dayjs/plugin/utc')
    var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin

    dayjs.extend(utc)
    dayjs.extend(timezone)

    const tz = "Asia/Tehran";
    ////////////////////////////
    const location=useLocation();
    const group = location.state;
    const history = useNavigate();
    const {AuthD} = useAuth();
    const [team1,setTeam1] = useState();
    const [team2,setTeam2] = useState();
    const [time,setTime] = useState(dayjs());
	const adapter = AdapterDayjs;
    const handleSubmit = async e =>{
        e.preventDefault();
        const dateTime = dayjs(time,"yyyy-MM-dd'T'HH:mm:ss'Z'");
        const utcTime= dateTime.tz(tz,true).format();
        const dataToSend = {team1, team2, 'time':utcTime, 'group':group.id};
        const eventData = await createEvent(AuthD.token,dataToSend);
        if(eventData){
            enqueueSnackbar('Event Created!!!', {variant:'success',anchorOrigin:{
                    vertical:"top",
                    horizontal:"right",
                }});
            history('/details/'+group.id);
        }else{
            enqueueSnackbar('Error in Creating Event', {variant:'error',anchorOrigin:{
                    vertical:"top",
                    horizontal:"right",
                }});
        }
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
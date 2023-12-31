import {useEffect, useState} from "react";
import {getEvent} from "../services/event-services";


export function useFetchEvent(token,eventId){

    const [Event, setEvent] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const getData = async () => {
            setLoading(true);
            const data = await getEvent(token,eventId);
            setEvent(data);
            setLoading(false);
            setError(null);
        }
        getData();
    },[eventId]);
    return [Event, loading, error]
}

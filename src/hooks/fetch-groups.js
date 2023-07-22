import {useState , useEffect} from "react";
import { getGroup , getGroups } from "../services/group-services";

export function useFetchGroup(groupId){

    const [group, setGroup] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
		const getData = async () => {
            setLoading(true);
            const data = await getGroup(groupId);
            setGroup(data);
            setLoading(false);
        }
        getData();
    },[groupId]);
    return [group, loading, error]
}

export function useFetchGroups(){

    const [groups, setGroups] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const getData = async () => {
            setLoading(true);
            const data = await getGroups();
            setGroups(data);
            setLoading(false);
        }
        getData();
    },[]);
    return [groups, loading, error]
}
import React, {useState} from "react";
import { useAuth } from "../../hooks/useAuth";
import {Link} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import {Hook} from '../react-classes'
import {uploadAvatar} from "../../services/user-services";

function Account(){
    const { AuthD } = useAuth();
    const [image, setImage] = useState();
    const hook=Hook();
    const uploadFile = async e => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append('image',image,image.name);
        const profileData = await uploadAvatar(AuthD.user.profile.id, uploadData);
    }

    return(
        <div>
            <Link to={'/'}>Back</Link>
            <h1>Account</h1>
            <form onSubmit={uploadFile}>
                <label htmlFor="">
                    <p>upload your avatar</p>
                    <TextField type="file" onChange={e => setImage(e.target.files[0])}></TextField>
                </label>
                <br/>
                <br/>
                <br/>
                <Button type="submit" variant="contained" color="primary" className={hook.root}>Upload File</Button>
            </form>
        </div>
    )
}

export default Account;
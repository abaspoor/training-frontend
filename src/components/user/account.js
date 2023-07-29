import React, {useState} from "react";
import { useAuth } from "../../hooks/useAuth";
import {Link} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import {Hook} from '../react-classes'
import {auth, register, uploadAvatar} from "../../services/user-services";
import InputAdornment from "@mui/material/InputAdornment";
import PasswordIcon from "@mui/icons-material/Password";
import {changePass} from "../../services/user-services";

function Account(){
    const { AuthD } = useAuth();
    const [image, setImage] = useState();
    const [OldPassword, SetOldPassword] = useState('');
    const [NewPassword, SetNewPassword] = useState('');
    const [ConfirmPassword, SetConfirmPassword] = useState('');
    const hook=Hook();

    const passMatch = () => {
        return NewPassword === ConfirmPassword;
    }
    const uploadFile = async e => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append('image',image,image.name);
        const profileData = await uploadAvatar(AuthD.user.profile.id, uploadData);
    }

    const submitchangePass= async e => {
		e.preventDefault();
        if(passMatch()){
            console.log(NewPassword);
            const regData = await changePass({old_password:OldPassword,new_password:NewPassword},AuthD.user.id);
            // if(regData){
            //     const data = await auth({username, password});
            //     setAuth(data);
            //     history('/account');
            // }
        }else{
            console.log('password not match')
        }
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
            <br/>
            <h1>Change Password</h1>
            <form onSubmit={submitchangePass}>
                <TextField
                    id="old password"
                    label="Old Password"
                    type={"password"}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PasswordIcon color="primary"/>
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    onChange={e => SetOldPassword(e.target.value)}
                />
                <br/>
                <TextField
                    id="new password"
                    label="new password"
                    type={"password"}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PasswordIcon color="primary"/>
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    onChange={e => SetNewPassword(e.target.value)}
                />
				<br/>
                <TextField
                    id="repeat password"
                    label="repeat password"
                    type={"password"}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PasswordIcon color="primary"/>
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    onChange={e => SetConfirmPassword(e.target.value)}
                />
                <br/>
                <br/>
                <br/>
                <Button type="submit" variant="contained" color="primary" className={hook.root}>Change Your Password</Button>
            </form>
        </div>
    )
}

export default Account;
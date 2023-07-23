import {useContext, createContext, useState} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({user, children}) => {

    const [ authDAta, setAuthData ] = useState(user);

    const setAuth = newUser => {
        if(newUser){
            localStorage.setItem('bwf-user', JSON.stringify(newUser));
        }else{
            localStorage.removeItem('bwf-user');
        }
        setAuthData(newUser);
    }

    return (
        <AuthContext.Provider value={{authDAta, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext);

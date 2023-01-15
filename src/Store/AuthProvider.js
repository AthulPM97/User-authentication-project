import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {

    const [token, setToken] = useState('');
    
    const userIsLoggedin = !!token;

    const loginHandler = (token) => {
        setToken(token);
    }
    
    const logoutHandler = () => {
        setToken(null);
    }

    const authContext = {
        idToken: token,
        isLoggedin: userIsLoggedin,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>
    )
}

export default AuthProvider;
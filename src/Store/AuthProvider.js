import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {

    const storedToken = localStorage.getItem('idToken') || '';

    const [token, setToken] = useState(storedToken);
    
    const userIsLoggedin = !!token;

    const loginHandler = (token) => {
        localStorage.setItem('idToken', token);
        setToken(localStorage.getItem('idToken'));
    }
    
    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('idToken');
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
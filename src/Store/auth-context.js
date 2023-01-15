import react from "react"

const AuthContext = react.createContext({
    idToken: '',
    isLoggedin: null,
    login: (token) => {},
    logout: () => {}
});

export default AuthContext;

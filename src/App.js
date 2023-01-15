import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./Store/auth-context";

function App() {

  const authCtx = useContext(AuthContext);

  console.log(authCtx);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedin && <Route path="/auth">
          <AuthPage />
        </Route>}
        <Route path="/profile">
          {authCtx.isLoggedin && <UserProfile />}
          {!authCtx.isLoggedin && <Redirect to='/' />}
        </Route>
        <Route path="*">
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

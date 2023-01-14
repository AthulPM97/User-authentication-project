import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  //islogin true -> user exists / app is in login mode
  //islogin false -> user doesn't exist / app is not in login mode

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [signUp, setSignUp] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("clicked");
    setSignUp(false);
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    console.log(enteredEmail, enteredPassword);

    if (isLogin) {
      fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArRLtYWhRK3W2RZDhehWVkArZcfer995I",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        }
      }).then((response) => {
        if(response.ok) {
          response.json().then(data => {
            console.log(data.idToken);
          })
        } else {
          return response.json().then((data) => {
            alert(`${data.error.message}`);
          });
        }
      })
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArRLtYWhRK3W2RZDhehWVkArZcfer995I",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
        } else {
          return res.json().then((data) => {
            alert(`${data.error.message}`);
          });
        }
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!signUp && <h3>Sending Request...</h3>}
          {signUp && <button>{isLogin ? "Login" : "Create Account"}</button>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

import { useContext, useRef } from "react";
import AuthContext from "../../Store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const passwordChangeHandler = (event) => {
    event.preventDefault();
    const newPassword = passwordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyArRLtYWhRK3W2RZDhehWVkArZcfer995I",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.idToken,
          password: newPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(res => {
      if(res.ok) {
        console.log("password changed");
      }
    });
  };

  return (
    <form className={classes.form} onSubmit={passwordChangeHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;

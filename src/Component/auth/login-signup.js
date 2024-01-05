import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { SignupData } from "../../Store/Auth-action";
import classes from "./login-signup.module.css";
import { authActions } from "../../Store/Auth-Slice";
import { uiActions } from "../../Store/ui-slice";
import { useHistory } from "react-router-dom";

const LoginSignup = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const conformPasswordInputRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const isSignIn = useSelector((state) => state.auth.isSignIn);

  const switchModeHandler = () => {
    
      dispatch(authActions.signup());
    
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConformPassword = conformPasswordInputRef.current.value;
    // const authData = {enteredEmail , enteredPassword ,enteredConformPassword};
    if (enteredEmail && enteredPassword === enteredConformPassword) {
      let url;
      if (!isSignIn) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5syuRqvk_dyaT5pr3ari36srtSlznE-o";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5syuRqvk_dyaT5pr3ari36srtSlznE-o";
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
          dispatch(
            authActions.login({ token: data.idToken, userId: data.localId })
          );
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("userId", data.localId);
          dispatch(
            uiActions.showNotification({
              status: "Success",
              title: "Login Successful...",
              message: "Login Successful... ",
            })
          );
          history.replace('/compose');
        })
        .catch((err) => {
          dispatch(
            uiActions.showNotification({
              status: "error",
              title: "error...",
              message: " data error!",
              err,
            })
          );
        });
    } else {
      dispatch(
        uiActions.showNotification({
          status: "wrong data format",
          title: "Sending wrong data...",
          message: "wrong data input !",
        })
      );
    }
  };
  return (
    <section className={classes.auth}>
      <h1>{isSignIn ? "Create New Account" : "Login"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label>Enter Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label>Your Password</label>
          <input type="password" id="password" ref={passwordInputRef} />
        </div>
        <div className={classes.control}>
          <label>Conform Your Password</label>
          <input
            type="password"
            id="conformPassword"
            ref={conformPasswordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isSignIn ? "Create Account" : "login"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchModeHandler}
          >
            {isSignIn ? "Login With Existing Account" : "Create New Account  |"}
          </button>
        </div>
      </form>
    </section>
  );
};
export default LoginSignup;

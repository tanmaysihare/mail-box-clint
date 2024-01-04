import { authActions } from "./Auth-Slice";
import { uiActions } from "./ui-slice";
import { useSelector } from "react-redux";

export const SignupData = (authData) => {
  const isSignIn = useSelector((state) => state.auth.isSignIn);

  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data !",
      })
    );
    let url;
    if (!isSignIn) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5syuRqvk_dyaT5pr3ari36srtSlznE-o";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5syuRqvk_dyaT5pr3ari36srtSlznE-o";
    }
    const signup = async () => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: authData.enteredEmail,
          password: authData.enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("sending cart data failed.");
      }
      const data = await response.json();
      return data;
    };
    try {
      const signUpData = await signup();
      dispatch(
        authActions.login({
          token: signUpData.idToken,
          userId: signUpData.localId,
        })
      );
      localStorage.setItem("token", signUpData.idToken);
      localStorage.setItem("userId", signUpData.localId);
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Fetch Successfully ",
          message: "Fetch cart data Successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error !!!",
          message: "Fetching cart data Failed !",
        })
      );
    }
  };
};

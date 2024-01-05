import React from "react";
import { Switch, Route } from "react-router-dom";
import ComposeMail from "./Component/Mail-box/Compose-mail";
import "./App.css";
import { useSelector } from "react-redux";
import Notification from "./Component/UI/Notification";
import AuthPage from "./Component/pages/authPage";

function App() {
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.ui.notification);
  return (
    <div className="App">
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}

      <Switch>
        <Route path="/" exact>
          <AuthPage />
        </Route>
        {isLogin && (
          <Route path="/compose">
            <ComposeMail />
          </Route>
        )}
      </Switch>
    </div>
  );
}

export default App;

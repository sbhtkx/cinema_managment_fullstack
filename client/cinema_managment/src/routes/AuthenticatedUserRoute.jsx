import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as auth from "../helpers/authHelpers";

const AuthenticatedUserRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default AuthenticatedUserRoute;

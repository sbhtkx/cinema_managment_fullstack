import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as auth from "../helpers/authHelpers";

const AuthenticatedAdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated() && auth.isAdmin()) {
          return <Component {...props} />;
        } else {
          return (
            // TODO: the redirection resets the redux thus logout the user - behaviour not wanted
            // solution: save redux state despite refresh
            // ("https://stackoverflow.com/questions/37195590/how-can-i-persist-redux-state-tree-on-refresh")
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

export default AuthenticatedAdminRoute;

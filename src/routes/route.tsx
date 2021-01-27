import React from "react";
import { Route as RRoute, Redirect } from "react-router-dom";
import { RouteComponentProps } from "react-router";

export interface RouteProps {
  path: string;
  exact?: boolean;
  Component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  Layout?: React.ComponentType<any>;
  isPrivate?: boolean;
}

function Route({ Component, Layout, isPrivate, ...rest }: RouteProps) {
  const isAuthorized = localStorage.getItem("accessToken");
  /**
   * Redirect user to SignIn page if he tries to access a private route
   * without authentication.
   */
  if (isPrivate && !isAuthorized) {
    return <Redirect to="/login" />;
  }

  /**
   * Redirect user to Main page if he tries to access a non private route
   * (SignIn or SignUp) after being authenticated.
   */
  if (!isPrivate && isAuthorized) {
    return <Redirect to="/welcome" />;
  }

  const route = (
    <RRoute {...rest} render={(props) => <Component {...props} />} />
  );

  if (Layout) {
    return <Layout>{route}</Layout>;
  }
  return route;
}

export default React.memo(Route);

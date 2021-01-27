import React from "react";
import { Switch } from "react-router-dom";
import { routes as appRoutes } from "./appRoutes";
import Route, { RouteProps } from "./route";

const routes: Array<RouteProps> = [...appRoutes];

export default function AppRouter() {
  return (
    <Switch>
      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </Switch>
  );
}

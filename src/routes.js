import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Index from "./components/layout/index";
import NotFound from "./components/errors/NotFound";

const routes = [
  {
    component: Index,
    exact: true,
    path: "/",
  },
  {
    component: NotFound,
  }
]

export default (
  <Switch>
    {routes.map((props, key) =>
      <Route
        key={key}
        exact={props.exact}
        path={props.path}
        component={props.component}
      />
    )}
  </Switch>
)
